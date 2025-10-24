import axios from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task';

// TODO: Replace with your actual .NET API URL
const API_BASE_URL = 'http://localhost:5000/api'; // Update this to your .NET API endpoint

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // GET /api/tasks - Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  // POST /api/tasks - Create a new task
  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await api.post<Task>('/tasks', task);
    return response.data;
  },

  // PUT /api/tasks/{id} - Update a task
  updateTask: async (id: string, updates: UpdateTaskDto): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}`, updates);
    return response.data;
  },

  // DELETE /api/tasks/{id} - Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  // PATCH /api/tasks/{id}/toggle - Toggle task completion
  toggleTask: async (id: string): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}/toggle`);
    return response.data;
  },
};
