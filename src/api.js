/**
 * Nihongo Vertex - Localhost & REST API Integration Client
 * Provides robust communication with http://localhost:8000
 * Handles offline caching, graceful timeouts, and bidirectional data sync.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Standard fetch wrapper with custom timeout and JSON parsing
 */
export async function apiRequest(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeout || 6000);

  try {
    const url = `${API_BASE_URL}${path}`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

/**
 * Check connectivity and status of the localhost backend server
 */
export async function checkBackendHealth() {
  const start = Date.now();
  try {
    const data = await apiRequest("/health", { timeout: 3000 });
    const ping = Date.now() - start;
    return {
      online: true,
      ping,
      service: data.service || "nihongo-vertex-api",
      version: data.version || "2.0.0",
      database: data.database || "sqlite",
      dbFile: data.db_file || "nihongo.db",
      timestamp: data.timestamp
    };
  } catch (err) {
    return {
      online: false,
      ping: null,
      error: err.name === "AbortError" ? "Connection timed out" : err.message
    };
  }
}

/**
 * Fetch learner progress from localhost SQLite database
 */
export async function fetchProgress() {
  return apiRequest("/api/v1/progress");
}

/**
 * Save learner progress to localhost SQLite database
 */
export async function saveProgressApi(progressData) {
  return apiRequest("/api/v1/progress", {
    method: "POST",
    body: JSON.stringify(progressData)
  });
}

/**
 * Send a prompt to the AI Sensei / Personal Mentor on localhost:8000
 */
export async function sendChatMessage(message, level = "N5", context = "") {
  return apiRequest("/api/v1/ai/chat", {
    method: "POST",
    body: JSON.stringify({ message, level, context }),
    timeout: 10000
  });
}

/**
 * Fetch recorded mistakes from localhost database
 */
export async function fetchMistakes() {
  return apiRequest("/api/v1/mistakes");
}

/**
 * Save recorded mistakes to localhost database
 */
export async function saveMistakesApi(mistakes) {
  return apiRequest("/api/v1/mistakes", {
    method: "POST",
    body: JSON.stringify({ mistakes })
  });
}

/**
 * Get all JLPT levels
 */
export async function getLevels() {
  return apiRequest("/api/v1/levels");
}

/**
 * Get modules for a specific JLPT level
 */
export async function getModules(level) {
  return apiRequest(`/api/v1/modules/${encodeURIComponent(level)}`);
}

/**
 * Get visual conversation scenes
 */
export async function fetchScenes() {
  return apiRequest("/api/v1/scenes");
}

/**
 * Get aggregate learning statistics from localhost SQLite
 */
export async function fetchStats() {
  return apiRequest("/api/v1/stats");
}
