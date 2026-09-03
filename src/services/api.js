// Central fetch wrapper for talking to the Orbit Buy backend.
// Handles the base URL, JWT header injection, JSON parsing,
// and ensures a consistent { success, message, ... } object.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// The backend's origin without the trailing /api — used to resolve
// relative image paths like "/uploads/products/shirt1.jpg".
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

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

  if (!isFormData) {
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
    // Network failure → return safe object
    return { success: false, message: "Couldn't reach the server. Is the backend running?" };
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // No JSON body (e.g. 204) → fine
  }

  if (!response.ok) {
    // Backend error → return safe object
    return {
      success: false,
      message: data?.message || `Request failed (${response.status})`,
    };
  }

  // Ensure success flag always exists
  if (data && typeof data.success === "undefined") {
    return { success: true, ...data };
  }

  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

export default api;
