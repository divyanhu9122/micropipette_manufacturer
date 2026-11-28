import { NextResponse } from "next/server";
import { HttpError } from "./errors";

export function privateJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      Vary: "Cookie, Authorization",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export function errorResponse(error: unknown, operation: string) {
  if (error instanceof HttpError) {
    const response = privateJson(
      {
        success: false,
        code: error.code,
        error: error.message,
        ...(error.fieldErrors ? { fieldErrors: error.fieldErrors } : {}),
      },
      error.status,
    );
    if (error.status === 429) response.headers.set("Retry-After", "60");
    return response;
  }

  // Avoid logging request bodies, tokens, or database error details containing PII.
  console.error(`[Backend] ${operation} failed`, {
    errorType: error instanceof Error ? error.name : "UnknownError",
  });
  return privateJson(
    {
      success: false,
      code: "INTERNAL_ERROR",
      error: "The request could not be completed. Please try again.",
    },
    500,
  );
}

export function databaseError(
  error: { code?: string } | null,
  operation: string,
): never {
  const status =
    error?.code === "42501"
      ? 403
      : ["23505", "23503"].includes(error?.code || "")
        ? 409
        : ["23514", "23502"].includes(error?.code || "")
          ? 400
          : 503;
  console.error(`[Database] ${operation} failed`, {
    code: error?.code ?? "unknown",
  });
  throw new HttpError(
    status,
    status === 403
      ? "FORBIDDEN"
      : status === 400
        ? "INVALID_INPUT"
        : status === 409
          ? "CONFLICT"
          : "DATABASE_UNAVAILABLE",
    status === 403
      ? "You do not have permission to perform this operation."
      : status === 400
        ? "Check the field values and category relationships before saving."
        : status === 409
          ? error?.code === "23503"
            ? "A linked record is missing or still in use. Check its brand and category."
            : "A record with these identifying details already exists."
          : "The database is unavailable or its setup is incomplete. Please try again later.",
  );
}
