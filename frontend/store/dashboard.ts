import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';

export interface DashboardStats {
  mission_completion_rate: number;
  goal_alignment: number;
  active_projects: number;
  today_missions_count: number;
  time_distribution: Record<string, number>;
}

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  error: null,
  
  fetchStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<DashboardStats>('/dashboard/stats');
      set({ stats: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  }
}));
