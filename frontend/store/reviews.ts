import { create } from 'zustand';
import { DailyReview, WeeklyReview, reviewsApi } from '@/lib/api/reviews';

interface ReviewsState {
  isLoading: boolean;
  error: string | null;
  submitDaily: (data: Partial<DailyReview>) => Promise<void>;
  submitWeekly: (data: Partial<WeeklyReview>) => Promise<void>;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
  isLoading: false,
  error: null,
  
  submitDaily: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await reviewsApi.createDaily(data);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  submitWeekly: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await reviewsApi.createWeekly(data);
      set({ isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  }
}));
