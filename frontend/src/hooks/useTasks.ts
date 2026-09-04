import { useState, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '../types';
import { taskService } from '../services/tasks';

export function useTasks(projectId?: number, completed?: boolean) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(completed, projectId);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId, completed]);

  const createTask = async (task: TaskCreate) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks([newTask, ...tasks]);
      return newTask;
    } catch (err) {
      setError('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id: number, updates: TaskUpdate) => {
    try {
      const updatedTask = await taskService.updateTask(id, updates);
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      setError('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
      throw err;
    }
  };

  const toggleTaskComplete = async (id: number, completed: boolean) => {
    return updateTask(id, { completed });
  };

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    refetch: fetchTasks,
  };
}
