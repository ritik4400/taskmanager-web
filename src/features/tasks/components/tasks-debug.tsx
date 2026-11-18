"use client";

import { useDeleteTask, useCreateTask } from "../hooks/use-task-mutations";
import { useTasks } from "../hooks/use-tasks";

export function TasksDebug() {
  const { data, isPending, isFetching, isError, error } = useTasks();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();

  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted-foreground">
        isPending: {String(isPending)} | isFetching: {String(isFetching)} | isError:{" "}
        {String(isError)}
      </p>

      {isError ? <p className="text-destructive">Error: {error.message}</p> : null}

      <button
        type="button"
        disabled={createTask.isPending}
        onClick={() =>
          createTask.mutate({
            title: `Sample task ${new Date().toLocaleTimeString()}`,
            description: "",
            status: "Todo",
            priority: "Medium",
            dueDate: "",
          })
        }
        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
      >
        {createTask.isPending ? "Adding..." : "Add sample task"}
      </button>

      <ul className="space-y-2">
        {data?.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-xl bg-card p-3 shadow-card"
          >
            <span className="text-sm">
              {task.title} ({task.status})
            </span>
            <button
              type="button"
              onClick={() => deleteTask.mutate(task.id)}
              className="text-sm text-destructive"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
