import { apiFetch } from "@/lib/api/client-fetch";
import type { LoginInput, RegisterInput } from "../schemas/auth.schemas";

type SessionUser = { fullName: string; email: string };

export function login(input: LoginInput) {
  return apiFetch<SessionUser>("/api/auth/login", { method: "POST", body: input });
}

export function register(input: RegisterInput) {
  return apiFetch<SessionUser>("/api/auth/register", { method: "POST", body: input });
}

export function logout() {
  return apiFetch<void>("/api/auth/logout", { method: "POST" });
}
