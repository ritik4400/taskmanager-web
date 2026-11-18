import "server-only";
import { backendFetch } from "@/lib/api/backend-client";
import type { TaskInput, TaskListQuery } from "../schemas/task.schemas";
import type { Task } from "../types";

// The form uses "" for "empty", the backend wants null
function toApiBody(input: TaskInput) {
  return {
    title: input.title,
    description: input.description || null,
    status: input.status,
    priority: input.priority,
    dueDate: input.dueDate || null,
  };
}

export function listTasks(token: string, filters: TaskListQuery) {
  return backendFetch<Task[]>("/api/tasks", {
    token,
    query: { status: filters.status, search: filters.search },
  });
}

export function createTask(token: string, input: TaskInput) {
  return backendFetch<Task>("/api/tasks", { method: "POST", token, body: toApiBody(input) });
}

export function updateTask(token: string, id: string, input: TaskInput) {
  return backendFetch<Task>(`/api/tasks/${id}`, {
    method: "PUT",
    token,
    body: toApiBody(input),
  });
}

export function deleteTask(token: string, id: string) {
  return backendFetch<void>(`/api/tasks/${id}`, { method: "DELETE", token });
}
