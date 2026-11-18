import { taskInputSchema, taskListQuerySchema } from "@/features/tasks/schemas/task.schemas";
import { createTask, listTasks } from "@/features/tasks/services/tasks.service";
import { withAuth } from "@/lib/api/auth-route";
import { validationErrorResponse } from "@/lib/api/route-helpers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const parsed = taskListQuerySchema.safeParse({
    status: searchParams.get("status") || undefined,
    search: searchParams.get("search") || undefined,
  });
  if (!parsed.success) return validationErrorResponse(parsed.error);

  return withAuth(async (token) => Response.json(await listTasks(token, parsed.data)));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = taskInputSchema.safeParse(body);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  return withAuth(async (token) =>
    Response.json(await createTask(token, parsed.data), { status: 201 }),
  );
}
