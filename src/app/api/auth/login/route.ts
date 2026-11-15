import { loginSchema } from "@/features/auth/schemas/auth.schemas";
import { loginUser } from "@/features/auth/services/auth.service";
import { errorResponse, validationErrorResponse } from "@/lib/api/route-helpers";
import { setSession } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return validationErrorResponse(parsed.error);

  try {
    const auth = await loginUser(parsed.data);
    await setSession(auth.token, auth.expiresAtUtc);
    return Response.json({ fullName: auth.fullName, email: auth.email });
  } catch (error) {
    return errorResponse(error);
  }
}
