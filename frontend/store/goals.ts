import { create } from 'zustand';
import { Goal, goalsApi } from '@/lib/api/goals';

interface GoalsState {
  goals: Goal[];
  isLoading: boolean;
  error: string | null;
  fetchGoals: () => Promise<void>;
  addGoal: (goal: Partial<Goal>) => Promise<void>;
}

export const useGoalsStore = create<GoalsState>((set, get) => ({
  goals: [],
  isLoading: false,
  error: null,
  
  fetchGoals: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await goalsApi.getGoals();
      set({ goals: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addGoal: async (goalData) => {
    try {
      const newGoal = await goalsApi.createGoal(goalData);
      set({ goals: [...get().goals, newGoal] });
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));
