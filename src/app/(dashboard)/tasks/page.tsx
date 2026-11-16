import { Suspense } from "react";
import { requireUser } from "@/features/auth/services/current-user";

async function UserGreeting() {
  const user = await requireUser();
  return (
    <p>
      Signed in as {user.name} ({user.email})
    </p>
  );
}

export default function TasksPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Tasks (placeholder)</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UserGreeting />
      </Suspense>
    </main>
  );
}
