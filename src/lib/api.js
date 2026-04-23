const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const request = async (method, endpoint, data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw { status: response.status, errors: json };
  }

  return json;
};

export const api = {
  post: (endpoint, data, token) => request('POST', endpoint, data, token),
  get:  (endpoint, token)       => request('GET',  endpoint, null, token),
  put:  (endpoint, data, token) => request('PUT',  endpoint, data, token),
  delete: (endpoint, token)     => request('DELETE', endpoint, null, token),
};

// Auth endpoints
export const authApi = {
  register:           (data)          => api.post('/auth/register', data),
  login:              (data)          => api.post('/auth/login', data),
  logout:             (token)         => api.post('/auth/logout', null, token),
  me:                 (token)         => api.get('/auth/me', token),
  forgotPassword:     (data)          => api.post('/auth/forgot-password', data),
  resetPassword:      (data)          => api.post('/auth/reset-password', data),
  sendVerification:   (token)         => api.post('/auth/email/verify/send', null, token),
};