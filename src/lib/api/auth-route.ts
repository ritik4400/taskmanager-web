import "server-only";
import { clearSession, getSessionToken } from "@/lib/session";
import { ApiError } from "./api-error";
import { errorResponse } from "./route-helpers";

export async function withAuth(handler: (token: string) => Promise<Response>): Promise<Response> {
  const token = await getSessionToken();
  if (!token) {
    return Response.json({ message: "Not signed in." }, { status: 401 });
  }

  try {
    return await handler(token);
  } catch (error) {
    // The backend rejected the token (expired or invalid): remove the dead cookie
    if (error instanceof ApiError && error.status === 401) {
      await clearSession();
    }
    return errorResponse(error);
  }
}
