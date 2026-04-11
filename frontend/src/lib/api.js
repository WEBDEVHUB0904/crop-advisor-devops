const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();

const ACCESS_TOKEN_KEY = "cropsense_access_token";

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export async function apiRequest(path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set(
    "Content-Type",
    headers.get("Content-Type") || "application/json",
  );

  const token = getAccessToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const errorMessage =
      payload?.detail || payload?.error || payload?.message || "Request failed";
    throw new Error(errorMessage);
  }

  return payload;
}

export { API_BASE_URL };
