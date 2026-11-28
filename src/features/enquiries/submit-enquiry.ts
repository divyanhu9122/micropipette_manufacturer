import type { CmsEnquiryPayload } from "@/types/cms";
import {
  ATTACHMENT_TYPES,
  MAX_ATTACHMENT_BYTES,
} from "@/lib/enquiries/attachments";

export type EnquirySubmission = CmsEnquiryPayload & {
  productSlug?: string;
  enquiryType?: "product" | "universal" | "oem" | "contact";
};

const pendingKeys = new Map<string, { key: string; expires: number }>();
export async function submitEnquiry(payload: EnquirySubmission, file?: File) {
  if (
    file &&
    (!Object.hasOwn(ATTACHMENT_TYPES, file.type) ||
      file.size > MAX_ATTACHMENT_BYTES)
  )
    throw new Error(
      "Choose a PDF, PNG, JPG or WebP reference file up to 3 MB.",
    );
  const body = JSON.stringify(payload);
  const now = Date.now();
  for (const [key, value] of pendingKeys)
    if (value.expires < now) pendingKeys.delete(key);
  if (pendingKeys.size > 32)
    pendingKeys.delete(pendingKeys.keys().next().value!);
  const submission = pendingKeys.get(body) || {
    key: crypto.randomUUID(),
    expires: now + 30 * 60_000,
  };
  pendingKeys.set(body, submission);
  let response: Response;
  try {
    response = await fetch("/api/enquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": submission.key,
      },
      body,
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    throw new Error(
      "We could not confirm your submission. Please check your connection and try again.",
    );
  }
  let data: {
    success?: boolean;
    enquiryId?: string;
    error?: string;
    fieldErrors?: Record<string, string>;
    attachmentToken?: string;
  };
  try {
    const parsed: unknown = await response.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid receipt response");
    }
    data = parsed;
  } catch {
    throw new Error(
      "We could not confirm your submission. Please try again later.",
    );
  }
  if (
    !response.ok ||
    data.success !== true ||
    typeof data.enquiryId !== "string" ||
    !data.enquiryId.trim()
  ) {
    const detail =
      data.fieldErrors && typeof data.fieldErrors === "object"
        ? Object.values(data.fieldErrors).find(
            (value) => typeof value === "string",
          )
        : undefined;
    throw new Error(
      detail ||
        (typeof data.error === "string" ? data.error : undefined) ||
        "Your enquiry could not be saved. Please try again later.",
    );
  }
  if (file) {
    try {
      if (typeof data.attachmentToken !== "string") throw new Error();
      const upload = await fetch(
        `/api/enquiries/${encodeURIComponent(data.enquiryId)}/attachment`,
        {
          method: "POST",
          headers: {
            "Content-Type": file.type,
            "X-File-Name": encodeURIComponent(file.name),
            "X-Enquiry-Upload-Token": data.attachmentToken,
          },
          body: file,
          signal: AbortSignal.timeout(60_000),
        },
      );
      const result = await upload.json().catch(() => null);
      if (!upload.ok || result?.success !== true)
        throw new Error(
          typeof result?.error === "string"
            ? result.error
            : "The reference file could not be uploaded.",
        );
    } catch (cause) {
      throw new Error(
        `Your enquiry is saved as ${data.enquiryId}, but the reference file was not confirmed. ${cause instanceof Error && cause.message ? cause.message : "Please retry the form submission."}`,
      );
    }
  }
  pendingKeys.delete(body);
  return data.enquiryId;
}
