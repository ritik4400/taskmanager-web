import { taskIdSchema, taskInputSchema } from "@/features/tasks/schemas/task.schemas";
import { deleteTask, updateTask } from "@/features/tasks/services/tasks.service";
import { withAuth } from "@/lib/api/auth-route";
import { validationErrorResponse } from "@/lib/api/route-helpers";

type RouteContext = { params: Promise<{ id: string }> };

const notFound = () => Response.json({ message: "Task not found." }, { status: 404 });

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!taskIdSchema.safeParse(id).success) return notFound();

  const body = await request.json().catch(() => null);
  const parsed = taskInputSchema.safeParse(body);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  return withAuth(async (token) => Response.json(await updateTask(token, id, parsed.data)));
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  if (!taskIdSchema.safeParse(id).success) return notFound();

  return withAuth(async (token) => {
    await deleteTask(token, id);
    return new Response(null, { status: 204 });
  });
}
