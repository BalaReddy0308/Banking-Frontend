import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Simple request interceptor for auth token (frontend pattern)
api.interceptors.request.use((config) => {
  // Example: attach token from secure storage (placeholder)
  const token = sessionStorage.getItem('auth_token')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export default api
