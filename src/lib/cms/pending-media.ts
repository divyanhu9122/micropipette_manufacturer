import { HttpError } from "@/lib/http/errors";

export function pendingMediaLocation(value: unknown, owner: string) {
  if (typeof value !== "string")
    throw new HttpError(400, "INVALID_INPUT", "Choose an uploaded file.");
  const match = value.match(
    /^\/api\/media\/(images|documents)\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:png|jpg|webp|pdf))$/i,
  );
  if (
    !match ||
    match[2] !== owner ||
    (match[1] === "documents") !== match[3].endsWith(".pdf")
  ) {
    throw new HttpError(
      400,
      "INVALID_INPUT",
      "Only your own unattached uploads can be discarded.",
    );
  }
  return { bucket: match[1], path: `${match[2]}/${match[3]}`, url: value };
}
