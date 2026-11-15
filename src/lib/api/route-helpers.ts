import { z } from "zod";
import { ApiError } from "./api-error";

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return Response.json(
      { message: error.message, fieldErrors: error.fieldErrors },
      { status: error.status },
    );
  }

  console.error(error);
  return Response.json({ message: "Something went wrong." }, { status: 500 });
}

export function validationErrorResponse(error: z.ZodError) {
  return Response.json(
    {
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(error).fieldErrors,
    },
    { status: 400 },
  );
}
