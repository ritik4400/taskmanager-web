import { apiFetch } from "@/lib/api/client-fetch";
import type { LoginInput } from "../schemas/auth.schemas";

type SessionUser = { fullName: string; email: string };

export function login(input: LoginInput) {
  return apiFetch<SessionUser>("/api/auth/login", { method: "POST", body: input });
}
