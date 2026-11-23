import "server-only";
import { isIP } from "node:net";
import { HttpError } from "./errors";

export function getClientIp(
  request: Request,
  {
    vercel = process.env.VERCEL === "1",
    production = process.env.NODE_ENV === "production",
  } = {},
) {
  // Vercel overwrites these headers. Arbitrary headers on a direct server are untrusted.
  if (vercel) {
    const ip = (
      request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for")
    )
      ?.split(",")[0]
      ?.trim();
    if (ip && isIP(ip)) return ip;
    throw new HttpError(
      503,
      "CLIENT_IDENTITY_UNAVAILABLE",
      "Enquiry submission is temporarily unavailable.",
    );
  }
  if (production) {
    throw new HttpError(
      503,
      "TRUSTED_PROXY_REQUIRED",
      "Enquiry submission is temporarily unavailable.",
    );
  }
  return "127.0.0.1";
}
