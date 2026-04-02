import { apiClient } from './client';

export interface TimeLog {
  id: string;
  category: string;
  duration_minutes: number;
  task: string;
  date: string;
}

export const timeLogsApi = {
  getLogs: async () => {
    const response = await apiClient.get<TimeLog[]>('/time-logs');
    return response.data;
  },
  
  createLog: async (data: Partial<TimeLog>) => {
    const response = await apiClient.post<TimeLog>('/time-logs', data);
    return response.data;
  }
};
