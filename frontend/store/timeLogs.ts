import { create } from 'zustand';
import { TimeLog, timeLogsApi } from '@/lib/api/timeLogs';
import { useDashboardStore } from './dashboard';

interface TimeLogsState {
  logs: TimeLog[];
  isLoading: boolean;
  error: string | null;
  fetchLogs: () => Promise<void>;
  addLog: (log: Partial<TimeLog>) => Promise<void>;
}

export const useTimeLogsStore = create<TimeLogsState>((set, get) => ({
  logs: [],
  isLoading: false,
  error: null,
  
  fetchLogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await timeLogsApi.getLogs();
      set({ logs: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addLog: async (logData) => {
    try {
      const newLog = await timeLogsApi.createLog(logData);
      set({ logs: [newLog, ...get().logs] });
      // Refresh dashboard stats optimally
      useDashboardStore.getState().fetchStats();
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));
