import assert from "node:assert/strict";
import { after, test } from "node:test";
import { createClient } from "@supabase/supabase-js";
import {
  mintAttachmentToken,
  verifyAttachmentToken,
} from "@/lib/enquiries/attachment-token";
import {
  readAttachment,
  MAX_ATTACHMENT_BYTES,
} from "@/lib/enquiries/attachments";
import { persistEnquiry } from "@/lib/enquiries/persistence";
import { deliverEnquiryNotifications } from "@/lib/enquiries/notifications";
import { productDetail, productListItem } from "@/lib/cms/presentation";
import { HttpError } from "@/lib/http/errors";
import type { Product } from "@/types/cms";

const originalSecret = process.env.SUPABASE_SECRET_KEY;
process.env.SUPABASE_SECRET_KEY = "sb_secret_isolated_workflow_fixture";
after(() => {
  if (originalSecret === undefined) delete process.env.SUPABASE_SECRET_KEY;
  else process.env.SUPABASE_SECRET_KEY = originalSecret;
});
test("attachment authorization is bound to one receipt and expires after ten minutes", () => {
  const receipt = "ENQ-11111111-1111-4111-8111-111111111111",
    now = 1_800_000_000_000;
  const token = mintAttachmentToken(receipt, now);
  assert.doesNotThrow(() =>
    verifyAttachmentToken(token, receipt, now + 599_000),
  );
  for (const [supplied, reference, time] of [
    [token, receipt, now + 600_000],
    [token, receipt + "x", now],
    [token + "x", receipt, now],
    ["bad", receipt, now],
  ] as const) {
    assert.throws(
      () => verifyAttachmentToken(supplied, reference, time),
      (error) => error instanceof HttpError && error.status === 403,
    );
  }
});
test("attachments validate bytes and enforce stream limits even without Content-Length", async () => {
  const request = (body: Uint8Array, type = "application/pdf") =>
    new Request("https://example.test", {
      method: "POST",
      headers: {
        "content-type": type,
        "x-file-name": encodeURIComponent("../reference.exe"),
      },
      body: body as BodyInit,
    });
  const file = await readAttachment(
    request(new TextEncoder().encode("%PDF-1.7\n%%EOF")),
  );
  assert.equal(file.extension, "pdf");
  assert.ok(!file.name.includes("/"));
  assert.ok(file.name.endsWith(".pdf"));
  await assert.rejects(
    () => readAttachment(request(new TextEncoder().encode("<html>bad</html>"))),
    (e) => e instanceof HttpError && e.status === 415,
  );
  await assert.rejects(
    () => readAttachment(request(new Uint8Array(MAX_ATTACHMENT_BYTES + 1))),
    (e) => e instanceof HttpError && e.status === 413,
  );
  await assert.rejects(
    () => readAttachment(request(new Uint8Array([1]), "image/svg+xml")),
    (e) => e instanceof HttpError && e.status === 415,
  );
});
test("an ambiguous enquiry retry returns the original receipt only for identical customer input", async () => {
  let saved: Record<string, unknown> | null = null,
    inserts = 0;
  const client = createClient(
    "https://isolated.example.test",
    "sb_secret_fixture",
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: async (input, init) => {
          const request = new Request(input, init);
          assert.equal(
            new URL(request.url).origin,
            "https://isolated.example.test",
          );
          if (request.method === "POST") {
            inserts++;
            if (saved) return Response.json({ code: "23505" }, { status: 409 });
            saved = await request.json();
            return Response.json(saved, { status: 201 });
          }
          return Response.json(saved ? [saved] : []);
        },
      },
    },
  );
  const input = {
    name: "Test Buyer",
    email: "buyer@example.test",
    company: "Test Lab",
    country: "India",
    message: "Please provide laboratory instrument information.",
    type: "Universal / General" as const,
    enquiryType: "universal" as const,
  };
  const key = "22222222-2222-4222-8222-222222222222";
  const first = await persistEnquiry(client, input, "127.0.0.1", key);
  assert.equal(await persistEnquiry(client, input, "127.0.0.2", key), first);
  await assert.rejects(
    () =>
      persistEnquiry(
        client,
        { ...input, message: "A different request using the same reference." },
        "127.0.0.1",
        key,
      ),
    (e) => e instanceof HttpError && e.status === 409,
  );
  assert.equal(inserts, 3);
});
test("missing email configuration leaves the durable notification queue untouched", async () => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    const client = createClient(
      "https://isolated.example.test",
      "sb_secret_fixture",
      {
        global: {
          fetch: async () => {
            throw new Error("No provider or database request is expected.");
          },
        },
      },
    );
    assert.deepEqual(await deliverEnquiryNotifications(client), {
      configured: false,
      sent: 0,
      failed: 0,
    });
  } finally {
    if (previous !== undefined) process.env.RESEND_API_KEY = previous;
  }
});
test("missing technical specifications do not become invented product claims", () => {
  const product = {
    id: "fixture",
    title: "Verified title",
    slug: "fixture",
    brands: undefined,
    categories: undefined,
    channels: 0,
    volume_min: null,
    volume_max: null,
    volume_unit: "µL",
    images: [],
    specifications: { Increment: 0 },
    is_autoclavable: false,
    features: [],
    applications: [],
  } as unknown as Product;
  const detail = productDetail(product);
  assert.equal(detail.keySpecs.channel, "Not specified");
  assert.equal(detail.keySpecs.increment, "0");
  assert.equal(productListItem(product).channelType, undefined);
  assert.deepEqual(detail.downloads, []);
  assert.deepEqual(detail.images, []);
});
