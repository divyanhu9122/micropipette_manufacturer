import { HttpError } from "@/lib/http/errors";
export const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
export const ATTACHMENT_TYPES: Record<string, string> = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};
export function validAttachmentSignature(bytes: Uint8Array, mime: string) {
  const begins = (values: number[], offset = 0) =>
    values.every((value, index) => bytes[offset + index] === value);
  if (mime === "application/pdf") return begins([37, 80, 68, 70, 45]);
  if (mime === "image/png") return begins([137, 80, 78, 71, 13, 10, 26, 10]);
  if (mime === "image/jpeg") return begins([255, 216, 255]);
  return (
    mime === "image/webp" &&
    begins([82, 73, 70, 70]) &&
    begins([87, 69, 66, 80], 8)
  );
}
export async function readAttachment(request: Request) {
  const mime =
    request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ||
    "";
  if (!Object.hasOwn(ATTACHMENT_TYPES, mime))
    throw new HttpError(
      415,
      "INVALID_FILE",
      "Choose a PDF, PNG, JPG or WebP reference file.",
    );
  if (Number(request.headers.get("content-length")) > MAX_ATTACHMENT_BYTES)
    throw new HttpError(
      413,
      "FILE_TOO_LARGE",
      "Reference files must be no larger than 3 MB.",
    );
  const reader = request.body?.getReader();
  if (!reader)
    throw new HttpError(400, "INVALID_FILE", "Choose a reference file.");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > MAX_ATTACHMENT_BYTES) {
        await reader.cancel();
        throw new HttpError(
          413,
          "FILE_TOO_LARGE",
          "Reference files must be no larger than 3 MB.",
        );
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  if (!length || !validAttachmentSignature(bytes, mime))
    throw new HttpError(
      415,
      "INVALID_FILE",
      "The file contents do not match a supported reference file.",
    );
  let original = "reference";
  try {
    original = decodeURIComponent(
      request.headers.get("x-file-name") || "reference",
    );
  } catch {
    throw new HttpError(400, "INVALID_FILE", "The file name is invalid.");
  }
  const name =
    original
      .slice(0, 150)
      .replace(/\.[^.]*$/, "")
      .replace(/[^\p{L}\p{N}._ -]/gu, "_") +
    "." +
    ATTACHMENT_TYPES[mime];
  return { bytes, mime, name, extension: ATTACHMENT_TYPES[mime] };
}
