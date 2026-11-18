import type { TaskListQuery } from "../schemas/task.schemas";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (filters: TaskListQuery) => [...taskKeys.all, "list", filters] as const,
};
