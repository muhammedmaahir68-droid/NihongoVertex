const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}

export async function getLevels() {
  return apiGet("/api/v1/levels");
}

export async function getModules(level) {
  return apiGet(`/api/v1/modules/${encodeURIComponent(level)}`);
}
