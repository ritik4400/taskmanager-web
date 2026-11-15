import { getCurrentUser } from "@/features/auth/services/auth.service";
import { ApiError } from "@/lib/api/api-error";
import { errorResponse } from "@/lib/api/route-helpers";
import { clearSession, getSessionToken } from "@/lib/session";

export async function GET() {
  const token = await getSessionToken();
  if (!token) {
    return Response.json({ message: "Not signed in." }, { status: 401 });
  }

  try {
    const user = await getCurrentUser(token);
    return Response.json(user);
  } catch (error) {
    // The backend rejected the token (expired or invalid): remove the dead cookie
    if (error instanceof ApiError && error.status === 401) {
      await clearSession();
    }
    return errorResponse(error);
  }
}
