import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { HttpError } from "@/lib/http/errors";
function secret() {
  const value =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!value)
    throw new HttpError(
      503,
      "BACKEND_NOT_CONFIGURED",
      "File uploads are temporarily unavailable.",
    );
  return value;
}
export function mintAttachmentToken(receipt: string, now = Date.now()) {
  const payload = Buffer.from(
    JSON.stringify({ receipt, expires: Math.floor(now / 1000) + 600 }),
  ).toString("base64url");
  return `${payload}.${createHmac("sha256", secret()).update(`enquiry-upload-v1:${payload}`).digest("base64url")}`;
}
export function verifyAttachmentToken(
  token: string,
  receipt: string,
  now = Date.now(),
) {
  const invalid = () =>
    new HttpError(
      403,
      "INVALID_UPLOAD_TOKEN",
      "The file upload link has expired. Submit the form again to retry.",
    );
  if (token.length > 1024) throw invalid();
  const parts = token.split(".");
  if (
    parts.length !== 2 ||
    !/^[A-Za-z0-9_-]+$/.test(parts[0]) ||
    !/^[A-Za-z0-9_-]+$/.test(parts[1])
  )
    throw invalid();
  const expected = createHmac("sha256", secret())
    .update(`enquiry-upload-v1:${parts[0]}`)
    .digest();
  const supplied = Buffer.from(parts[1], "base64url");
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  )
    throw invalid();
  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[0], "base64url").toString());
  } catch {
    throw invalid();
  }
  const seconds = Math.floor(now / 1000);
  if (
    payload.receipt !== receipt ||
    !Number.isInteger(payload.expires) ||
    payload.expires <= seconds ||
    payload.expires > seconds + 600
  )
    throw invalid();
}
export function attachmentBudgetKey(now = Date.now()) {
  return createHmac("sha256", secret())
    .update(`attachment-budget:${new Date(now).toISOString().slice(0, 10)}`)
    .digest("hex");
}
