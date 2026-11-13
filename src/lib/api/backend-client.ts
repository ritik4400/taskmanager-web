import "server-only";
import { env } from "@/config/env";
import { ApiError, type FieldErrors } from "./api-error";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | undefined;
  query?: Record<string, string | undefined>;
};

// Render’s free tier can take about a minute to wake up, so be generous.
const REQUEST_TIMEOUT_MS = 65_000;

function toCamelCase(key: string): string {
  return key.charAt(0).toLowerCase() + key.slice(1);
}

async function toApiError(response: Response): Promise<ApiError> {
  const text = await response.text();

  let data: { title?: string; errors?: Record<string, string[]> } | null = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  // 400 validation: backend keys are PascalCase ("Email"), forms want camelCase ("email")
  if (response.status === 400 && data?.errors) {
    const fieldErrors: FieldErrors = {};
    for (const [key, messages] of Object.entries(data.errors)) {
      fieldErrors[toCamelCase(key)] = messages;
    }
    return new ApiError("Please fix the highlighted fields.", 400, fieldErrors);
  }

  // Expired or missing token: the backend sends an empty body
  if (response.status === 401 && !data?.title) {
    return new ApiError("Your session has expired. Please log in again.", 401);
  }

  // 401 (wrong password), 404, 409, 500: the message is in "title"
  return new ApiError(data?.title ?? "Something went wrong.", response.status);
}

export async function backendFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, token, query } = options;

  const url = new URL(`${env.BACKEND_API_URL}${path}`);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value) url.searchParams.set(key, value);
  }

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : null,
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    // Network down, backend asleep past the timeout, DNS failure, etc.
    throw new ApiError("Cannot reach the server. Please try again.", 503);
  }

  if (!response.ok) throw await toApiError(response);
  if (response.status === 204) return undefined as T; // DELETE returns no body

  return (await response.json()) as T;
}
