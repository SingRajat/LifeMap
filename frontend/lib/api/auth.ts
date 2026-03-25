import { apiClient } from './client';

export const authApi = {
  login: async (username: string, password: string) => {
    // Note: OAuth2PasswordRequestForm expects form-data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await apiClient.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  register: async (email: string, username: string, password: string) => {
    const response = await apiClient.post('/auth/register', {
      email,
      username,
      password,
    });
    return response.data;
  },
};
