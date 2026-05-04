const API_BASE = 'http://localhost:5000/api';

// Helper function to handle API requests with authentication
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || error.error || 'API request failed');
    }

    return response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof Error) {
      const message = err.message.includes('Failed to fetch') || err.name === 'AbortError'
        ? 'Unable to reach the backend API. Make sure the backend is running on http://localhost:5000'
        : err.message;
      throw new Error(message);
    }
    throw err;
  }
}

// Authentication endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }
    }
    return data;
  },

  signup: async (email: string, password: string, name: string) => {
    const data = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    if (data.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.token);
      }
    }
    return data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('cboms_user');
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
};

// User endpoints
export const usersAPI = {
  getAll: () => apiRequest('/users'),
  getById: (id: number) => apiRequest(`/users/${id}`),
  update: (id: number, data: any) =>
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Units endpoints
export const unitsAPI = {
  getAll: () => apiRequest('/units', { headers: {} }), // Don't send auth header for GET
  getById: (id: number) => apiRequest(`/units/${id}`, { headers: {} }),
  create: (data: any) =>
    apiRequest('/units', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: any) =>
    apiRequest(`/units/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: number) =>
    apiRequest(`/units/${id}`, {
      method: 'DELETE',
    }),
};

// Bookings endpoints
export const bookingsAPI = {
  getAll: () => apiRequest('/bookings'),
  getByUser: (userId: number) => apiRequest(`/bookings/user/${userId}`),
  create: (data: any) =>
    apiRequest('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: number, data: any) =>
    apiRequest(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Visits endpoints
export const visitsAPI = {
  getAll: () => apiRequest('/visits'),
  create: (data: any) =>
    apiRequest('/visits', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  checkIn: (id: number) =>
    apiRequest(`/visits/${id}/checkin`, {
      method: 'PUT',
    }),
  checkOut: (id: number) =>
    apiRequest(`/visits/${id}/checkout`, {
      method: 'PUT',
    }),
};

export default {
  authAPI,
  usersAPI,
  unitsAPI,
  bookingsAPI,
  visitsAPI,
};
