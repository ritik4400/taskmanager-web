import { z } from "zod";
import { TASK_PRIORITIES, TASK_STATUSES } from "../constants";

// "" means "no due date" (that's what an empty date input gives us)
const dueDateSchema = z
  .string()
  .refine(
    (value) =>
      value === "" || (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value))),
    "Enter a valid date",
  );

// Used by the create and edit forms and by the route handlers.
// Every field is required here on purpose, because the backend PUT replaces everything.
export const taskInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters"),
  description: z.string().trim().max(1000, "Description must be at most 1000 characters"),
  status: z.enum(TASK_STATUSES),
  priority: z.enum(TASK_PRIORITIES),
  dueDate: dueDateSchema,
});

export const taskListQuerySchema = z.object({
  status: z.enum(TASK_STATUSES).optional(),
  search: z.string().trim().max(200).optional(),
});

export const taskIdSchema = z.string().regex(/^\d+$/);

export type TaskInput = z.infer<typeof taskInputSchema>;
export type TaskListQuery = z.infer<typeof taskListQuerySchema>;
