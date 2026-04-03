import { apiClient } from './client';

export interface Mission {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  date: string;
  energy_level_required: number;
}

export const missionsApi = {
  getTodaysMissions: async () => {
    const response = await apiClient.get<Mission[]>('/missions/today');
    return response.data;
  },
  
  createMission: async (data: Partial<Mission>) => {
    const response = await apiClient.post<Mission>('/missions/', data);
    return response.data;
  },
  
  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.put<Mission>(`/missions/${id}`, { status });
    return response.data;
  }
};
