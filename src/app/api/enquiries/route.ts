import type { NextRequest } from "next/server";
import { createPrivilegedSupabaseClient } from "@/lib/cms/admin";
import { persistEnquiry } from "@/lib/enquiries/persistence";
import { deliverEnquiryNotifications } from "@/lib/enquiries/notifications";
import { mintAttachmentToken } from "@/lib/enquiries/attachment-token";
import { HttpError } from "@/lib/http/errors";
import { getClientIp } from "@/lib/http/client-ip";
import { enforceEnquiryRateLimit } from "@/lib/http/rate-limit";
import { assertSameOrigin, readJsonObject } from "@/lib/http/request";
import { errorResponse, privateJson } from "@/lib/http/responses";
import { validateEnquiryPayload } from "@/lib/validation/enquiry";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request, true);
    const body = await readJsonObject(request);
    if (body.website_hp || body.hp_check) {
      // A bot trap deliberately receives no receipt ID; the UI requires a confirmed ID.
      return privateJson({ success: true, message: "Enquiry received." });
    }
    const validation = validateEnquiryPayload(body);
    if (!validation.isValid || !validation.sanitizedData) {
      throw new HttpError(
        400,
        "VALIDATION_FAILED",
        "Please correct the highlighted fields.",
        validation.errors,
      );
    }
    const client = createPrivilegedSupabaseClient();
    const idempotencyKey = request.headers.get("idempotency-key") || undefined;
    if (
      idempotencyKey &&
      !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
        idempotencyKey,
      )
    )
      throw new HttpError(
        400,
        "INVALID_INPUT",
        "The submission reference is invalid. Refresh the form and try again.",
      );
    const ip = getClientIp(request);
    await enforceEnquiryRateLimit(client, ip);
    const enquiryId = await persistEnquiry(
      client,
      validation.sanitizedData,
      ip,
      idempotencyKey,
    );
    // A delivery failure never changes a successfully stored enquiry into an error.
    try {
      await deliverEnquiryNotifications(client, enquiryId);
    } catch {
      console.error("[Notifications] Delivery deferred to the durable queue");
    }
    return privateJson(
      {
        success: true,
        message:
          "Thank you for your enquiry. Our team will review your request and respond shortly.",
        enquiryId,
        attachmentToken: mintAttachmentToken(enquiryId),
      },
      201,
    );
  } catch (error) {
    return errorResponse(error, "submit enquiry");
  }
}
