import { apiClient } from './client';

export interface DailyReview {
  id?: string;
  date: string;
  content?: string;
  mood_score?: number;
}

export interface WeeklyReview {
  id?: string;
  start_date: string;
  end_date: string;
  content?: string;
}

export const reviewsApi = {
  createDaily: async (data: Partial<DailyReview>) => {
    const response = await apiClient.post<DailyReview>('/reviews/daily', data);
    return response.data;
  },
  
  createWeekly: async (data: Partial<WeeklyReview>) => {
    const response = await apiClient.post<WeeklyReview>('/reviews/weekly', data);
    return response.data;
  }
};
