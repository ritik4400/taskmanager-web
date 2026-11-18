import { Suspense } from "react";
import { requireUser } from "@/features/auth/services/current-user";

async function UserGreeting() {
  const user = await requireUser();
  return <p className="mt-2 text-muted-foreground">Signed in as {user.name}</p>;
}

export default function TasksPage() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Tasks (placeholder)</h1>
      <Suspense fallback={<p className="mt-2 text-muted-foreground">Loading...</p>}>
        <UserGreeting />
      </Suspense>
    </div>
  );
}
