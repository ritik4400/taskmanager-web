import { apiFetch } from "@/lib/api/client-fetch";
import type { TaskInput, TaskListQuery } from "../schemas/task.schemas";
import type { Task } from "../types";

export function fetchTasks(filters: TaskListQuery) {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.search) params.set("search", filters.search);

  const query = params.toString();
  return apiFetch<Task[]>(`/api/tasks${query ? `?${query}` : ""}`);
}

export function addTask(input: TaskInput) {
  return apiFetch<Task>("/api/tasks", { method: "POST", body: input });
}

export function editTask(id: number, input: TaskInput) {
  return apiFetch<Task>(`/api/tasks/${id}`, { method: "PUT", body: input });
}

export function removeTask(id: number) {
  return apiFetch<void>(`/api/tasks/${id}`, { method: "DELETE" });
}
