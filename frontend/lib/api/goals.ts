import { apiClient } from './client';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: number;
  deadline: string;
}

export const goalsApi = {
  getGoals: async () => {
    const response = await apiClient.get<Goal[]>('/goals/');
    return response.data;
  },
  
  createGoal: async (data: Partial<Goal>) => {
    const response = await apiClient.post<Goal>('/goals/', data);
    return response.data;
  },
  
  updateGoal: async (id: string, data: Partial<Goal>) => {
    const response = await apiClient.put<Goal>(`/goals/${id}`, data);
    return response.data;
  },
  
  deleteGoal: async (id: string) => {
    await apiClient.delete(`/goals/${id}`);
  }
};
