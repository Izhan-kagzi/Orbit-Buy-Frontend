// ============================================================
// Orbit Buy - Central API Helper
// ============================================================

const DEFAULT_DEV_URL = "http://localhost:5000/api";

const DEFAULT_PROD_URL =
  "https://orbit-buy.onrender.com/api";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? DEFAULT_DEV_URL
    : DEFAULT_PROD_URL);

// ============================================================
// API ORIGIN
// ============================================================
//
// API URL:
//   https://orbit-buy.onrender.com/api
//
// API origin:
//   https://orbit-buy.onrender.com
//
// Media URL:
//   https://orbit-buy.onrender.com/uploads/products/file.jpg
// ============================================================

export const API_ORIGIN = API_URL.replace(
  /\/api\/?$/,
  ""
);

// ============================================================
// MEDIA URL HELPER
// ============================================================

export function getImageUrl(value) {
  if (!value) {
    return "";
  }

  let mediaPath = String(value).trim();

  if (!mediaPath) {
    return "";
  }

  // Convert Windows-style paths to web paths.
  mediaPath = mediaPath.replace(/\\/g, "/");

  // ----------------------------------------------------------
  // Already an absolute URL
  // ----------------------------------------------------------

  if (
    mediaPath.startsWith("http://") ||
    mediaPath.startsWith("https://")
  ) {
    return mediaPath;
  }

  // ----------------------------------------------------------
  // Protocol-relative URL
  // ----------------------------------------------------------

  if (mediaPath.startsWith("//")) {
    return `${window.location.protocol}${mediaPath}`;
  }

  // ----------------------------------------------------------
  // Remove accidental API prefix from media paths
  //
  // Wrong:
  // /api/uploads/products/file.jpg
  //
  // Correct:
  // /uploads/products/file.jpg
  // ----------------------------------------------------------

  if (
    mediaPath.startsWith("/api/uploads/")
  ) {
    mediaPath = mediaPath.replace(
      /^\/api\/uploads\//,
      "/uploads/"
    );
  }

  // Also handle:
  //
  // api/uploads/products/file.jpg
  //

  if (
    mediaPath.startsWith("api/uploads/")
  ) {
    mediaPath = mediaPath.replace(
      /^api\/uploads\//,
      "/uploads/"
    );
  }

  // ----------------------------------------------------------
  // Remove duplicate leading slashes
  // ----------------------------------------------------------

  mediaPath = `/${mediaPath.replace(/^\/+/, "")}`;

  // ----------------------------------------------------------
  // Make sure media isn't accidentally pointing to:
  //
  // /api/uploads/...
  // ----------------------------------------------------------

  mediaPath = mediaPath.replace(
    /^\/api\/uploads\//,
    "/uploads/"
  );

  // ----------------------------------------------------------
  // Final URL
  // ----------------------------------------------------------

  return `${API_ORIGIN}${mediaPath}`;
}

// ============================================================
// VIDEO URL HELPER
// ============================================================
//
// Videos use the exact same URL rules as images.
// Kept separate for readability in product components.
// ============================================================

export function getVideoUrl(value) {
  return getImageUrl(value);
}

// ============================================================
// TOKEN
// ============================================================

function getToken() {
  try {
    return localStorage.getItem("orbit-token");
  } catch {
    return null;
  }
}

// ============================================================
// API REQUEST
// ============================================================

async function request(
  path,
  {
    method = "GET",
    body,
    isFormData = false,
    auth = true,
  } = {}
) {
  const headers = {};

  // ----------------------------------------------------------
  // JSON
  // ----------------------------------------------------------
  //
  // IMPORTANT:
  // Never manually set Content-Type for FormData.
  //
  // The browser automatically creates:
  //
  // multipart/form-data; boundary=...
  //
  // ----------------------------------------------------------

  if (
    !isFormData &&
    body !== undefined
  ) {
    headers["Content-Type"] =
      "application/json";
  }

  // ----------------------------------------------------------
  // JWT
  // ----------------------------------------------------------

  if (auth) {
    const token = getToken();

    if (token) {
      headers["Authorization"] =
        `Bearer ${token}`;
    }
  }

  // ----------------------------------------------------------
  // Request URL
  // ----------------------------------------------------------

  const requestPath = String(path || "");

  const url =
    requestPath.startsWith("http://") ||
    requestPath.startsWith("https://")
      ? requestPath
      : `${API_URL}${
          requestPath.startsWith("/")
            ? requestPath
            : `/${requestPath}`
        }`;

  // ----------------------------------------------------------
  // FETCH
  // ----------------------------------------------------------

  let response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body: isFormData
        ? body
        : body !== undefined
        ? JSON.stringify(body)
        : undefined,
    });
  } catch (networkError) {
    const error = new Error(
      "Couldn't reach the server. Is the backend running?"
    );

    error.status = 0;
    error.success = false;
    error.networkError = networkError;

    throw error;
  }

  // ----------------------------------------------------------
  // RESPONSE
  // ----------------------------------------------------------

  let data = null;

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    try {
      const text =
        await response.text();

      data = text || null;
    } catch {
      data = null;
    }
  }

  // ----------------------------------------------------------
  // ERROR
  // ----------------------------------------------------------

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data?.message
        ? data.message
        : `Request failed (${response.status})`;

    const error =
      new Error(message);

    error.status =
      response.status;

    error.success = false;

    error.response = data;

    // --------------------------------------------------------
    // Expired/invalid JWT
    // --------------------------------------------------------

    if (
      response.status === 401 &&
      auth
    ) {
      try {
        localStorage.removeItem(
          "orbit-token"
        );

        localStorage.removeItem(
          "orbit-user"
        );
      } catch {
        // Ignore localStorage errors.
      }
    }

    throw error;
  }

  // ----------------------------------------------------------
  // SUCCESS
  // ----------------------------------------------------------

  if (
    data &&
    typeof data === "object" &&
    typeof data.success ===
      "undefined"
  ) {
    return {
      success: true,
      ...data,
    };
  }

  return (
    data ?? {
      success: true,
    }
  );
}

// ============================================================
// API METHODS
// ============================================================

export const api = {
  get: (path, opts = {}) =>
    request(path, {
      ...opts,
      method: "GET",
    }),

  post: (
    path,
    body,
    opts = {}
  ) =>
    request(path, {
      ...opts,
      method: "POST",
      body,
    }),

  put: (
    path,
    body,
    opts = {}
  ) =>
    request(path, {
      ...opts,
      method: "PUT",
      body,
    }),

  patch: (
    path,
    body,
    opts = {}
  ) =>
    request(path, {
      ...opts,
      method: "PATCH",
      body,
    }),

  delete: (
    path,
    body,
    opts = {}
  ) =>
    request(path, {
      ...opts,
      method: "DELETE",
      body,
    }),
};

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default api;