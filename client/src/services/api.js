const API_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth API
export const authAPI = {
  register: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role: 'geologist' })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  }
};

// Wells API
export const wellsAPI = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append('lasFile', file);

    const response = await fetch(`${API_URL}/wells/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  getAll: async () => {
    const response = await fetch(`${API_URL}/wells`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/wells/${id}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/wells/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  }
};
