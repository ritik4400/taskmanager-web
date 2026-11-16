import { ApiError, type FieldErrors } from "./api-error";

type ErrorBody = { message?: string; fieldErrors?: FieldErrors };

export async function apiFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      method: options.method ?? "GET",
      headers: options.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: options.body !== undefined ? JSON.stringify(options.body) : null,
    });
  } catch {
    throw new ApiError("Cannot reach the server. Please try again.", 503);
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as ErrorBody | null;
    throw new ApiError(
      data?.message ?? "Something went wrong.",
      response.status,
      data?.fieldErrors,
    );
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}
