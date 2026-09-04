import api from './api';
import { Task, TaskCreate, TaskUpdate } from '../types';

export const taskService = {
  async getTasks(completed?: boolean, projectId?: number): Promise<Task[]> {
    const params: any = {};
    if (completed !== undefined) params.completed = completed;
    if (projectId !== undefined) params.project_id = projectId;
    
    const response = await api.get<Task[]>('/tasks', { params });
    return response.data;
  },

  async getTask(id: number): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  async createTask(task: TaskCreate): Promise<Task> {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  async updateTask(id: number, task: TaskUpdate): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
