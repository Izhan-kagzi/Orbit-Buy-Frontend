// Central fetch wrapper for talking to the Orbit Buy backend.
// Handles the base URL, JWT header injection, JSON parsing,
// and turns backend failures into thrown Errors carrying the
// backend's own { success, message } payload.

const DEFAULT_DEV_URL = "http://localhost:5000/api";
const DEFAULT_PROD_URL = "https://orbit-buy.onrender.com/api";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? DEFAULT_DEV_URL : DEFAULT_PROD_URL);

// The backend's origin without the trailing /api — used to resolve
// relative image paths like "/uploads/products/shirt1.jpg".
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

export { API_URL };

export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}

function getToken() {
  return localStorage.getItem("orbit-token");
}

async function request(
  path,
  { method = "GET", body, isFormData = false, auth = true } = {}
) {
  const headers = {};

  if (!isFormData && body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    const error = new Error(
      "Couldn't reach the server. Is the backend running?"
    );
    error.status = 0;
    error.success = false;
    throw error;
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // No JSON body (e.g. 204) → fine
  }

  if (!response.ok) {
    const error = new Error(
      data?.message || `Request failed (${response.status})`
    );

    error.status = response.status;
    error.success = false;
    error.response = data;

    // A dead or expired session should not leave stale credentials
    // behind — every later request would fail the same way.
    if (response.status === 401 && auth) {
      localStorage.removeItem("orbit-token");
      localStorage.removeItem("orbit-user");
    }

    throw error;
  }

  // Ensure success flag always exists
  if (data && typeof data.success === "undefined") {
    return { success: true, ...data };
  }

  return data ?? { success: true };
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) =>
    request(path, { ...opts, method: "PATCH", body }),
  delete: (path, body, opts) =>
    request(path, { ...opts, method: "DELETE", body }),
};

export default api;
