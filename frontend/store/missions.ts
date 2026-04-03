import { create } from 'zustand';
import { Mission, missionsApi } from '@/lib/api/missions';

interface MissionsState {
  todaysMissions: Mission[];
  isLoading: boolean;
  error: string | null;
  fetchTodaysMissions: () => Promise<void>;
  toggleMission: (id: string) => Promise<void>;
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
  
  toggleMission: async (id: string) => {
    const previousMissions = get().todaysMissions;
    const mission = previousMissions.find(m => m.id === id);
    if (!mission) return;
    
    const newStatus = mission.status === 'completed' ? 'pending' : 'completed';
    
    // Optimistic Update
    set({
      todaysMissions: previousMissions.map((m) => 
        m.id === id ? { ...m, status: newStatus } : m
      )
    });

    try {
      await missionsApi.updateStatus(id, newStatus);
    } catch (error: any) {
      // Rollback on failure
      set({ todaysMissions: previousMissions, error: error.message });
    }
  }
}));
