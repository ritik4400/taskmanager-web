import { TasksDebug } from "@/features/tasks/components/tasks-debug";

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Tasks (debug)</h1>
      <TasksDebug />
    </div>
  );
}
