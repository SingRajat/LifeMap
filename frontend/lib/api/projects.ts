import { apiClient } from './client';

export interface Project {
  id: string;
  name: string;
  status: string;
  goal_id: string;
  tasks?: number;
}

export const projectsApi = {
  getProjects: async () => {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  },
  
  createProject: async (data: Partial<Project>) => {
    const response = await apiClient.post<Project>('/projects', data);
    return response.data;
  }
};
