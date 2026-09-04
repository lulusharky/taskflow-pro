import api from './api';
import { Project, ProjectCreate, ProjectUpdate } from '../types';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>('/projects');
    return response.data;
  },

  async getProject(id: number): Promise<Project> {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async createProject(project: ProjectCreate): Promise<Project> {
    const response = await api.post<Project>('/projects', project);
    return response.data;
  },

  async updateProject(id: number, project: ProjectUpdate): Promise<Project> {
    const response = await api.put<Project>(`/projects/${id}`, project);
    return response.data;
  },

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}`);
  },
};
