import "server-only";
import { createHmac } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import { HttpError } from "./errors";

/** Atomic limits live in Postgres, so Vercel instances share the same counter. */
export async function enforceEnquiryRateLimit(
  client: SupabaseClient,
  ip: string,
) {
  const secret =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!secret)
    throw new HttpError(
      503,
      "BACKEND_NOT_CONFIGURED",
      "Enquiry submission is temporarily unavailable.",
    );
  const key = createHmac("sha256", secret)
    .update(`enquiry:${ip}`)
    .digest("hex");
  const { data, error } = await client.rpc("consume_request_limit", {
    p_key: key,
    p_limit: 5,
    p_window_seconds: 60,
  });
  if (error || !data || typeof data.allowed !== "boolean") {
    throw new HttpError(
      503,
      "RATE_LIMIT_UNAVAILABLE",
      "Enquiry submission is temporarily unavailable. Please try again later.",
    );
  }
  if (!data.allowed) {
    throw new HttpError(
      429,
      "RATE_LIMITED",
      "Too many submission attempts. Please wait a minute and try again.",
    );
  }
}
