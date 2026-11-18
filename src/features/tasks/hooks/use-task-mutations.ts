"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TaskInput } from "../schemas/task.schemas";
import { addTask, editTask, removeTask } from "../services/tasks.client";
import { taskKeys } from "./task-keys";

function useInvalidateTasks() {
  const queryClient = useQueryClient();
  // Returning the promise keeps the mutation "pending" until the list has refreshed
  return () => queryClient.invalidateQueries({ queryKey: taskKeys.all });
}

export function useCreateTask() {
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: (input: TaskInput) => addTask(input),
    onSuccess: invalidateTasks,
  });
}

export function useUpdateTask() {
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: TaskInput }) => editTask(id, input),
    onSuccess: invalidateTasks,
  });
}

export function useDeleteTask() {
  const invalidateTasks = useInvalidateTasks();

  return useMutation({
    mutationFn: (id: number) => removeTask(id),
    onSuccess: invalidateTasks,
  });
}
