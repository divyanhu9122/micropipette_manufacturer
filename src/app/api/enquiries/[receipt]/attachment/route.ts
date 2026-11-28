import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { createPrivilegedSupabaseClient } from "@/lib/cms/admin";
import {
  verifyAttachmentToken,
  attachmentBudgetKey,
} from "@/lib/enquiries/attachment-token";
import { readAttachment } from "@/lib/enquiries/attachments";
import { assertSameOrigin } from "@/lib/http/request";
import { getClientIp } from "@/lib/http/client-ip";
import { enforceEnquiryRateLimit } from "@/lib/http/rate-limit";
import { HttpError } from "@/lib/http/errors";
import {
  privateJson,
  errorResponse,
  databaseError,
} from "@/lib/http/responses";
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ receipt: string }> },
) {
  try {
    assertSameOrigin(request, true);
    const { receipt } = await params;
    if (!/^ENQ-[a-f0-9-]{36}$/i.test(receipt))
      throw new HttpError(
        400,
        "INVALID_INPUT",
        "The enquiry reference is invalid.",
      );
    verifyAttachmentToken(
      request.headers.get("x-enquiry-upload-token") || "",
      receipt,
    );
    const client = createPrivilegedSupabaseClient();
    await enforceEnquiryRateLimit(client, `upload:${getClientIp(request)}`);
    const { data: enquiry, error } = await client
      .from("enquiries")
      .select("id,attachment_path,attachment_sha256")
      .eq("enquiry_id", receipt)
      .maybeSingle();
    if (error) databaseError(error, "read attachment enquiry");
    if (!enquiry)
      throw new HttpError(404, "NOT_FOUND", "The enquiry was not found.");
    const file = await readAttachment(request);
    const hash = createHash("sha256").update(file.bytes).digest("hex");
    if (enquiry.attachment_path) {
      if (enquiry.attachment_sha256 === hash)
        return privateJson({ success: true });
      throw new HttpError(
        409,
        "ATTACHMENT_EXISTS",
        "A reference file is already stored for this enquiry. Ask our team before changing it.",
      );
    }
    const configuredLimit = Number(
      process.env.ENQUIRY_ATTACHMENT_DAILY_LIMIT || 10,
    );
    const limit =
      Number.isInteger(configuredLimit) &&
      configuredLimit >= 1 &&
      configuredLimit <= 1000
        ? configuredLimit
        : 10;
    const { data: budget, error: budgetError } = await client.rpc(
      "consume_request_limit",
      { p_key: attachmentBudgetKey(), p_limit: limit, p_window_seconds: 86400 },
    );
    if (budgetError || budget?.allowed !== true)
      throw new HttpError(
        503,
        "UPLOAD_UNAVAILABLE",
        "Your enquiry is saved, but file uploads are temporarily unavailable. Our team can arrange a file transfer.",
      );
    const path = `${enquiry.id}/${hash}.${file.extension}`;
    const result = await client.storage
      .from("enquiry-attachments")
      .upload(path, file.bytes, { contentType: file.mime, upsert: false });
    if (
      result.error &&
      String((result.error as { statusCode?: string }).statusCode) !== "409"
    )
      throw new HttpError(
        503,
        "UPLOAD_UNAVAILABLE",
        "The file could not be stored. Please retry the form submission.",
      );
    if (!result.error && result.data?.path !== path)
      throw new HttpError(
        503,
        "UPLOAD_UNAVAILABLE",
        "The reference file upload was not confirmed. Please retry.",
      );
    const { data: saved, error: saveError } = await client
      .from("enquiries")
      .update({
        attachment_path: path,
        attachment_name: file.name,
        attachment_mime: file.mime,
        attachment_size: file.bytes.length,
        attachment_sha256: hash,
      })
      .eq("id", enquiry.id)
      .is("attachment_path", null)
      .select("id")
      .maybeSingle();
    if (saveError) databaseError(saveError, "link enquiry attachment");
    if (!saved)
      throw new HttpError(
        409,
        "ATTACHMENT_EXISTS",
        "This enquiry already received a reference file. Please contact our team for changes.",
      );
    return privateJson({ success: true }, 201);
  } catch (error) {
    return errorResponse(error, "store enquiry attachment");
  }
}
