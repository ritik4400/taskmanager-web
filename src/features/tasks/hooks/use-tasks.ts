"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { TaskListQuery } from "../schemas/task.schemas";
import { fetchTasks } from "../services/tasks.client";
import { taskKeys } from "./task-keys";

export function useTasks(filters: TaskListQuery = {}) {
  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => fetchTasks(filters),
    // While a new filter or search loads, keep showing the previous list instead of flashing empty
    placeholderData: keepPreviousData,
  });
}
