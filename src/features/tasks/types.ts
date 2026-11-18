import type { TaskPriority, TaskStatus } from "./constants";

// Matches TaskResponse from the backend API contract
export type Task = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null; // "yyyy-MM-dd"
  createdAt: string;
  updatedAt: string;
};
