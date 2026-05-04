const API_BASE = "http://localhost:5000/api";
async function apiRequest(endpoint, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5e3);
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    signal: controller.signal
  });
  clearTimeout(timeoutId);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }
  return response.json();
}
const authAPI = {
  login: async (email, password) => {
    const data = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    if (data.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
    }
    return data;
  },
  signup: async (email, password, name) => {
    const data = await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name })
    });
    if (data.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
    }
    return data;
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("cboms_user");
    }
  },
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }
};
const unitsAPI = {
  getAll: () => apiRequest("/units", { headers: {} }),
  // Don't send auth header for GET
  getById: (id) => apiRequest(`/units/${id}`, { headers: {} }),
  create: (data) => apiRequest("/units", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  update: (id, data) => apiRequest(`/units/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  }),
  delete: (id) => apiRequest(`/units/${id}`, {
    method: "DELETE"
  })
};
export {
  authAPI as a,
  unitsAPI as u
};
