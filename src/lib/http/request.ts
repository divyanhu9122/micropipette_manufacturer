import { HttpError } from "./errors";

export function assertSameOrigin(request: Request, allowMissingOrigin = false) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    throw new HttpError(
      403,
      "INVALID_ORIGIN",
      "This request must come from this website.",
    );
  }
  if (!origin && allowMissingOrigin) return;
  // Next.js may normalize request.url to an internal hostname. Compare with the
  // incoming Host, whose forwarding must be preserved by the trusted proxy.
  const url = new URL(request.url);
  const host = request.headers.get("host") || url.host;
  const protocol =
    request.headers.get("x-forwarded-proto") || url.protocol.slice(0, -1);
  let expectedOrigin: string;
  try {
    const expected = new URL(`${protocol}://${host}`);
    if (
      !["https:", "http:"].includes(expected.protocol) ||
      expected.username ||
      expected.password ||
      expected.pathname !== "/" ||
      expected.search ||
      expected.hash
    )
      throw new Error("Invalid request origin");
    expectedOrigin = expected.origin;
  } catch {
    throw new HttpError(
      403,
      "INVALID_ORIGIN",
      "This request must come from this website.",
    );
  }
  if (!origin || origin !== expectedOrigin) {
    throw new HttpError(
      403,
      "INVALID_ORIGIN",
      "This request must come from this website.",
    );
  }
}

export async function readJsonObject(request: Request, maxBytes = 32_768) {
  if (
    !/^application\/json(?:;|$)/i.test(
      request.headers.get("content-type") ?? "",
    )
  ) {
    throw new HttpError(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "Send the request as JSON.",
    );
  }
  if (Number(request.headers.get("content-length")) > maxBytes) {
    throw new HttpError(
      413,
      "PAYLOAD_TOO_LARGE",
      "The submitted information is too large.",
    );
  }

  const reader = request.body?.getReader();
  if (!reader)
    throw new HttpError(400, "INVALID_JSON", "A JSON object is required.");
  let length = 0;
  let text = "";
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new HttpError(
          413,
          "PAYLOAD_TOO_LARGE",
          "The submitted information is too large.",
        );
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.releaseLock();
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    throw new HttpError(
      400,
      "INVALID_JSON",
      "The request contains invalid JSON.",
    );
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new HttpError(400, "INVALID_JSON", "A JSON object is required.");
  }
  return body as Record<string, unknown>;
}
