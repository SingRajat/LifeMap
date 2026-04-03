import { apiClient } from './client';

export const authApi = {
  login: async (username: string, password: string) => {
    // Note: OAuth2PasswordRequestForm expects URL-encoded form data
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    
    const response = await apiClient.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
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
