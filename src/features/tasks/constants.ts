export const TASK_STATUSES = ["Todo", "InProgress", "Done"] as const;
export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

// The backend speaks "InProgress", the UI says "In Progress"
export const STATUS_LABELS: Record<TaskStatus, string> = {
  Todo: "To Do",
  InProgress: "In Progress",
  Done: "Done",
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  Low: "Low",
  Medium: "Medium",
  High: "High",
};
