import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/api-error";
import { getSessionToken } from "@/lib/session";
import { getCurrentUser } from "./auth.service";

// cache() makes this run once per request, even if a layout and a page both call it
export const getUser = cache(async () => {
  const token = await getSessionToken();
  if (!token) return null;

  try {
    return await getCurrentUser(token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
});

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/api/auth/expired");
  return user;
}
