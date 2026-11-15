import { registerSchema } from "@/features/auth/schemas/auth.schemas";
import { registerUser } from "@/features/auth/services/auth.service";
import { errorResponse, validationErrorResponse } from "@/lib/api/route-helpers";
import { setSession } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  try {
    const auth = await registerUser(parsed.data);
    await setSession(auth.token, auth.expiresAtUtc);
    return Response.json({ fullName: auth.fullName, email: auth.email }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
