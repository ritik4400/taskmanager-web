import "server-only";
import { backendFetch } from "@/lib/api/backend-client";
import type { LoginInput, RegisterInput } from "../schemas/auth.schemas";
import type { AuthResponse, CurrentUser } from "../types";

export function registerUser(input: RegisterInput) {
  return backendFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: input,
  });
}

export function loginUser(input: LoginInput) {
  return backendFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: input,
  });
}

export function getCurrentUser(token: string) {
  return backendFetch<CurrentUser>("/api/auth/me", { token });
}
