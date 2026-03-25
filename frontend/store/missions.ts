import { create } from 'zustand';
import { Mission, missionsApi } from '@/lib/api/missions';

interface MissionsState {
  todaysMissions: Mission[];
  isLoading: boolean;
  error: string | null;
  fetchTodaysMissions: () => Promise<void>;
  completeMission: (id: string) => Promise<void>;
}

export const useMissionsStore = create<MissionsState>((set, get) => ({
  todaysMissions: [],
  isLoading: false,
  error: null,
  
  fetchTodaysMissions: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await missionsApi.getTodaysMissions();
      set({ todaysMissions: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  completeMission: async (id: string) => {
    try {
      await missionsApi.updateStatus(id, 'completed');
      set({
        todaysMissions: get().todaysMissions.map((m) => 
          m.id === id ? { ...m, status: 'completed' } : m
        )
      });
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));
