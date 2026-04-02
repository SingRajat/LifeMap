import { create } from 'zustand';
import { Project, projectsApi } from '@/lib/api/projects';

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (project: Partial<Project>) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await projectsApi.getProjects();
      set({ projects: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addProject: async (data) => {
    try {
      const newProject = await projectsApi.createProject(data);
      set({ projects: [...get().projects, newProject] });
    } catch (error: any) {
      set({ error: error.message });
    }
  }
}));
