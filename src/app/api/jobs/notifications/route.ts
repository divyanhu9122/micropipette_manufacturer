import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { createPrivilegedSupabaseClient } from "@/lib/cms/admin";
import { deliverEnquiryNotifications } from "@/lib/enquiries/notifications";
import { HttpError } from "@/lib/http/errors";
import { privateJson, errorResponse } from "@/lib/http/responses";
export const maxDuration = 60;
export async function GET(request: NextRequest) {
  try {
    const expected = process.env.CRON_SECRET;
    const supplied =
      request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
    if (
      !expected ||
      expected.length < 32 ||
      Buffer.byteLength(supplied) !== Buffer.byteLength(expected) ||
      !timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
    )
      throw new HttpError(
        401,
        "UNAUTHENTICATED",
        "This endpoint is restricted.",
      );
    return privateJson(
      await deliverEnquiryNotifications(createPrivilegedSupabaseClient()),
    );
  } catch (error) {
    return errorResponse(error, "notification processing");
  }
}
