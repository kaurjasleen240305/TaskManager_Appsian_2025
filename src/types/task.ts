export interface Task {
  id: string; // Guid from C#
  description: string;
  isCompleted: boolean;
  createdAt?: string;
}

export interface CreateTaskDto {
  description: string;
}

export interface UpdateTaskDto {
  description?: string;
  isCompleted?: boolean;
}
