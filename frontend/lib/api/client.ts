import axios from 'axios';

// Create base instance
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to inject auth token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // We will store the token in localStorage via Zustand later
    const token = localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage') as string)?.state?.token 
      : null;
      
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
