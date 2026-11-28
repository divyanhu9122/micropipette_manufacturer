import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { afterEach, beforeEach, test } from "node:test";
import { NextRequest } from "next/server";
import {
  GET as getProducts,
  POST as postProduct,
} from "@/app/api/admin/products/route";
import {
  PATCH as patchProduct,
  DELETE as archiveProduct,
} from "@/app/api/admin/products/[id]/route";
import { GET as getBlog, POST as postBlog } from "@/app/api/admin/blog/route";
import {
  PATCH as patchBlog,
  DELETE as archiveBlog,
} from "@/app/api/admin/blog/[id]/route";
import {
  GET as getBrands,
  POST as postBrand,
} from "@/app/api/admin/brands/route";
import { GET as getEnquiries } from "@/app/api/admin/enquiries/route";
import { PATCH as patchEnquiry } from "@/app/api/admin/enquiries/[id]/route";
import { DELETE as discardMedia } from "@/app/api/admin/media/route";
import { pendingMediaLocation } from "@/lib/cms/pending-media";
import { parseSettingsInput } from "@/lib/validation/admin";
import { GET as getSession } from "@/app/api/auth/session/route";
import { POST as postEnquiry } from "@/app/api/enquiries/route";
import { submitEnquiry } from "@/features/enquiries/submit-enquiry";
import { getSupabasePublicConfig } from "@/lib/config/supabase";
import { HttpError } from "@/lib/http/errors";
import { getClientIp } from "@/lib/http/client-ip";
import { assertSameOrigin, readJsonObject } from "@/lib/http/request";
import { parseEnquiryUpdate, parseProductInput } from "@/lib/validation/admin";
import { validateEnquiryPayload } from "@/lib/validation/enquiry";

const userId = "11111111-1111-4111-8111-111111111111";
const recordId = "22222222-2222-4222-8222-222222222222";
const environmentNames = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SECRET_KEY",
  "SUPABASE_SERVICE_KEY",
];
const initialEnvironment = Object.fromEntries(
  environmentNames.map((name) => [name, process.env[name]]),
);
const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const context = { params: Promise.resolve({ id: recordId }) };
const validEnquiry = {
  name: "Test Buyer",
  email: "buyer@example.com",
  company: "Test Laboratory",
  country: "India",
  type: "OEM / Private Label" as const,
  message: "Please provide a proposal for our laboratory.",
  quantity: "50 units",
  oemSpecifications: "Blue housing and private-label packaging.",
};

beforeEach(() => {
  for (const name of environmentNames) delete process.env[name];
  console.error = () => {};
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  for (const name of environmentNames) {
    if (initialEnvironment[name] === undefined) delete process.env[name];
    else process.env[name] = initialEnvironment[name];
  }
});

function jwt(aal = "aal2", sub = userId) {
  const encode = (value: unknown) =>
    Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub, aal, aud: "authenticated", role: "authenticated", iss: "https://testproject.supabase.co/auth/v1", exp: Math.floor(Date.now() / 1000) + 600 })}`;
  return `${unsigned}.${createHmac("sha256", "test-only-signing-key").update(unsigned).digest("base64url")}`;
}

function request(path: string, method = "GET", body?: unknown, token?: string) {
  return new NextRequest(`https://site.example${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}

interface FakeOptions {
  role?: string;
  active?: boolean;
  missingMember?: boolean;
  membershipError?: boolean;
  authDenied?: boolean;
  rateAllowed?: boolean;
  rateError?: boolean;
  insertError?: boolean;
  noReceipt?: boolean;
  emptyProducts?: boolean;
  mediaReference?: "products" | "settings";
  mediaReferenceError?: boolean;
}

function fakeSupabase(options: FakeOptions = {}) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://testproject.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test_only";
  process.env.SUPABASE_SECRET_KEY = "sb_secret_test_only";
  const calls: {
    path: string;
    method: string;
    authorization: string | null;
    body?: Record<string, unknown>;
    search: string;
  }[] = [];
  globalThis.fetch = async (input, init) => {
    const incoming = new Request(input, init);
    const url = new URL(incoming.url);
    assert.equal(
      url.origin,
      "https://testproject.supabase.co",
      "No live Supabase request is allowed in these tests.",
    );
    const body = incoming.method === "GET" ? undefined : await incoming.json();
    calls.push({
      path: url.pathname,
      method: incoming.method,
      authorization: incoming.headers.get("authorization"),
      body,
      search: url.search,
    });
    const json = (value: unknown, status = 200) =>
      Response.json(value, { status });
    if (url.pathname === "/auth/v1/user")
      return options.authDenied
        ? json({ message: "Invalid session" }, 401)
        : json({
            id: userId,
            email: "staff@example.com",
            aud: "authenticated",
            role: "authenticated",
            user_metadata: { role: "admin" },
            app_metadata: {},
            factors: [],
          });
    if (url.pathname === "/rest/v1/staff_members") {
      if (options.membershipError)
        return json({ code: "42P01", message: "Private setup details" }, 404);
      return json(
        options.missingMember
          ? []
          : [
              {
                user_id: userId,
                role: options.role ?? "admin",
                is_active: options.active ?? true,
              },
            ],
      );
    }
    if (url.pathname === "/rest/v1/rpc/consume_request_limit")
      return options.rateError
        ? json({ code: "42883", message: "Missing function" }, 404)
        : json({ allowed: options.rateAllowed ?? true, retry_after: 60 });
    if (url.pathname === "/rest/v1/enquiries" && incoming.method === "POST") {
      if (options.insertError)
        return json(
          { code: "XX000", message: "Private buyer@example.com details" },
          400,
        );
      return json(
        options.noReceipt ? {} : { enquiry_id: body.enquiry_id },
        201,
      );
    }
    if (
      url.pathname === "/storage/v1/object/images" &&
      incoming.method === "DELETE"
    )
      return json([]);
    if (url.pathname === "/rest/v1/settings" && options.mediaReferenceError)
      return json({ message: "Private failure" }, 503);
    if (
      url.pathname === "/rest/v1/settings" &&
      options.mediaReference === "settings"
    )
      return json([
        { value: { logo: `/api/media/images/${userId}/${recordId}.png` } },
      ]);
    if (
      url.pathname === "/rest/v1/products" &&
      options.mediaReference === "products"
    )
      return json([{ id: recordId }]);
    if (url.pathname.startsWith("/rest/v1/"))
      return json(
        options.emptyProducts
          ? []
          : incoming.method === "GET"
            ? []
            : { id: recordId, ...body },
      );
    throw new Error(`Unexpected test transport path: ${url.pathname}`);
  };
  return calls;
}

test("all administrative handlers deny anonymous callers before any database request", async () => {
  globalThis.fetch = async () => {
    throw new Error("Anonymous requests must not reach Supabase");
  };
  const checks = [
    () => getProducts(request("/api/admin/products")),
    () => postProduct(request("/api/admin/products", "POST", {})),
    () =>
      patchProduct(
        request(`/api/admin/products/${recordId}`, "PATCH", {}),
        context,
      ),
    () =>
      archiveProduct(
        request(`/api/admin/products/${recordId}`, "DELETE"),
        context,
      ),
    () => getBlog(request("/api/admin/blog")),
    () => postBlog(request("/api/admin/blog", "POST", {})),
    () =>
      patchBlog(request(`/api/admin/blog/${recordId}`, "PATCH", {}), context),
    () =>
      archiveBlog(request(`/api/admin/blog/${recordId}`, "DELETE"), context),
    () => getBrands(request("/api/admin/brands")),
    () => postBrand(request("/api/admin/brands", "POST", {})),
    () => getEnquiries(request("/api/admin/enquiries")),
    () =>
      patchEnquiry(
        request(`/api/admin/enquiries/${recordId}`, "PATCH", {}),
        context,
      ),
  ];
  for (const check of checks) {
    const response = await check();
    assert.equal(response.status, 401);
    assert.match(response.headers.get("cache-control")!, /private.*no-store/);
  }
});

test("staff access fails closed when configuration is missing", async () => {
  const response = await getProducts(
    request("/api/admin/products", "GET", undefined, jwt()),
  );
  assert.equal(response.status, 503);
});

test("sales cannot use content APIs even when user metadata says admin", async () => {
  const calls = fakeSupabase({ role: "sales" });
  const response = await getProducts(
    request("/api/admin/products", "GET", undefined, jwt()),
  );
  assert.equal(response.status, 403);
  assert.ok(!calls.some((call) => call.path === "/rest/v1/products"));
});

for (const [label, options] of Object.entries({
  inactive: { active: false },
  unapproved: { missingMember: true },
  unknownRole: { role: "owner" },
})) {
  test(`${label} staff cannot read enquiries`, async () => {
    fakeSupabase(options);
    const response = await getEnquiries(
      request("/api/admin/enquiries", "GET", undefined, jwt()),
    );
    assert.equal(response.status, 403);
  });
}

test("permission lookup failures do not fall back to JWT or profile roles", async () => {
  fakeSupabase({ membershipError: true });
  const response = await getEnquiries(
    request("/api/admin/enquiries", "GET", undefined, jwt()),
  );
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "AUTHORIZATION_UNAVAILABLE");
});

test("revoked identities are rejected before membership or content access", async () => {
  const calls = fakeSupabase({ authDenied: true });
  assert.equal(
    (await getProducts(request("/api/admin/products", "GET", undefined, jwt())))
      .status,
    401,
  );
  assert.ok(!calls.some((call) => call.path === "/rest/v1/staff_members"));
});

test("password-only tokens cannot access staff data but may enter their own MFA flow", async () => {
  fakeSupabase();
  const token = jwt("aal1");
  const denied = await getProducts(
    request("/api/admin/products", "GET", undefined, token),
  );
  assert.equal(denied.status, 403);
  assert.equal((await denied.json()).code, "MFA_REQUIRED");
  const session = await getSession(
    request("/api/auth/session", "GET", undefined, token),
  );
  assert.equal(session.status, 200);
  assert.equal((await session.json()).requiresMfa, true);
});

test("staff database requests carry the user's JWT, never the privileged secret", async () => {
  const calls = fakeSupabase();
  const token = jwt();
  assert.equal(
    (await getProducts(request("/api/admin/products", "GET", undefined, token)))
      .status,
    200,
  );
  assert.equal(
    calls.find((call) => call.path === "/rest/v1/products")?.authorization,
    `Bearer ${token}`,
  );
});

test("verified claim identity must match the user returned by Auth", async () => {
  fakeSupabase();
  assert.equal(
    (
      await getProducts(
        request("/api/admin/products", "GET", undefined, jwt("aal2", recordId)),
      )
    ).status,
    401,
  );
});

test("removing membership takes effect on the next request even with the same token", async () => {
  const token = jwt();
  fakeSupabase({ role: "sales" });
  assert.equal(
    (
      await getEnquiries(
        request("/api/admin/enquiries", "GET", undefined, token),
      )
    ).status,
    200,
  );
  fakeSupabase({ role: "sales", active: false });
  assert.equal(
    (
      await getEnquiries(
        request("/api/admin/enquiries", "GET", undefined, token),
      )
    ).status,
    403,
  );
});

test("editors cannot publish and their updates atomically require a draft record", async () => {
  const calls = fakeSupabase({ role: "editor", emptyProducts: true });
  const token = jwt();
  const denied = await postProduct(
    request(
      "/api/admin/products",
      "POST",
      {
        title: "Product",
        slug: "product",
        brand_id: recordId,
        category_id: recordId,
        is_active: true,
      },
      token,
    ),
  );
  assert.equal(denied.status, 403);
  const update = await patchProduct(
    request(
      `/api/admin/products/${recordId}`,
      "PATCH",
      { title: "Updated" },
      token,
    ),
    context,
  );
  assert.equal(update.status, 404);
  const write = calls.find(
    (call) => call.path === "/rest/v1/products" && call.method === "PATCH",
  );
  assert.match(write?.search ?? "", /is_active=eq.false/);
});

test("admin input rejects immutable or unexpected fields", async () => {
  fakeSupabase();
  const response = await postProduct(
    request(
      "/api/admin/products",
      "POST",
      {
        title: "Product",
        slug: "product",
        brand_id: recordId,
        category_id: recordId,
        user_id: userId,
      },
      jwt(),
    ),
  );
  assert.equal(response.status, 400);
  assert.throws(
    () => parseEnquiryUpdate({ email: "replacement@example.com" }),
    HttpError,
  );
  assert.throws(
    () => parseProductInput({ volume_min: 100, volume_max: 10 }),
    HttpError,
  );
  assert.equal(
    parseProductInput(
      {
        title: "Product",
        slug: "product",
        brand_id: recordId,
        category_id: recordId,
      },
      true,
    ).is_active,
    false,
  );
});

test("cross-site cookie writes are denied before session access", async () => {
  const incoming = new NextRequest("https://site.example/api/admin/products", {
    method: "POST",
    headers: {
      cookie: "sb-testproject-auth-token=fake",
      origin: "https://other.example",
      "content-type": "application/json",
    },
    body: "{}",
  });
  assert.equal((await postProduct(incoming)).status, 403);
  assert.throws(
    () =>
      assertSameOrigin(
        new Request("https://site.example", { headers: { origin: "null" } }),
      ),
    HttpError,
  );
});

test("same-origin checks handle Next.js internal hostnames without trusting forwarded hosts", () => {
  assert.doesNotThrow(() =>
    assertSameOrigin(
      new Request("http://localhost:3010/api/enquiries", {
        headers: { host: "127.0.0.1:3010", origin: "http://127.0.0.1:3010" },
      }),
    ),
  );
  assert.throws(
    () =>
      assertSameOrigin(
        new Request("https://site.example/api/admin/products", {
          headers: {
            host: "site.example",
            origin: "https://other.example",
            "x-forwarded-host": "other.example",
          },
        }),
      ),
    HttpError,
  );
});

test("JSON parsing distinguishes malformed, non-object, oversized and unsupported bodies", async () => {
  for (const [body, type, status] of [
    ["{", "application/json", 400],
    ["null", "application/json", 400],
    ["[]", "application/json", 400],
    ['{"value":"too long"}', "application/json", 413],
    ["{}", "text/plain", 415],
  ] as const) {
    await assert.rejects(
      readJsonObject(
        new Request("https://site.example", {
          method: "POST",
          headers: { "content-type": type },
          body,
        }),
        15,
      ),
      (error: unknown) => error instanceof HttpError && error.status === status,
    );
  }
});

test("enquiry validation preserves requirements and rejects malformed optional fields", () => {
  const result = validateEnquiryPayload(validEnquiry);
  assert.equal(result.isValid, true);
  assert.equal(result.sanitizedData?.quantity, validEnquiry.quantity);
  assert.equal(
    result.sanitizedData?.oemSpecifications,
    validEnquiry.oemSpecifications,
  );
  for (const extra of [
    { company: "x".repeat(151) },
    { country: "x".repeat(81) },
    { email: "invalid" },
    { quantity: {} },
    { productSlug: "bad/reference" },
    { enquiryType: "admin" },
  ])
    assert.equal(
      validateEnquiryPayload({ ...validEnquiry, ...extra }).isValid,
      false,
    );
});

test("unconfigured enquiry submission returns unavailable, never a receipt", async () => {
  const response = await postEnquiry(
    request("/api/enquiries", "POST", validEnquiry),
  );
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
});

test("database insert failures do not expose details or produce false confirmations", async () => {
  fakeSupabase({ insertError: true });
  const response = await postEnquiry(
    request("/api/enquiries", "POST", validEnquiry),
  );
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.success, false);
  assert.equal(body.enquiryId, undefined);
  assert.ok(!JSON.stringify(body).includes("buyer@example.com"));
});

test("confirmed enquiry inserts preserve quantities and OEM details and control internal fields", async () => {
  const calls = fakeSupabase();
  const response = await postEnquiry(
    request("/api/enquiries", "POST", {
      ...validEnquiry,
      status: "closed",
      internal_notes: "Injected",
    }),
  );
  assert.equal(response.status, 201);
  assert.match((await response.json()).enquiryId, /^ENQ-[0-9a-f-]{36}$/);
  const saved = calls.find((call) => call.path === "/rest/v1/enquiries")?.body;
  assert.equal(saved?.quantity, validEnquiry.quantity);
  assert.equal(saved?.oem_specifications, validEnquiry.oemSpecifications);
  assert.equal(saved?.status, "new");
  assert.equal(saved?.internal_notes, undefined);
  assert.match(
    String(
      calls.find((call) => call.path.includes("consume_request_limit"))?.body
        ?.p_key,
    ),
    /^[a-f0-9]{64}$/,
  );
});

test("an insert without a confirmed receipt is not reported as saved", async () => {
  fakeSupabase({ noReceipt: true });
  assert.equal(
    (await postEnquiry(request("/api/enquiries", "POST", validEnquiry))).status,
    503,
  );
});

test("shared rate limits block persistence and missing RPCs fail closed", async () => {
  const calls = fakeSupabase({ rateAllowed: false });
  const blocked = await postEnquiry(
    request("/api/enquiries", "POST", validEnquiry),
  );
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers.get("retry-after"), "60");
  assert.ok(!calls.some((call) => call.path === "/rest/v1/enquiries"));
  fakeSupabase({ rateError: true });
  assert.equal(
    (await postEnquiry(request("/api/enquiries", "POST", validEnquiry))).status,
    503,
  );
});

test("all form clients require an actual successful receipt", async () => {
  for (const [body, status] of [
    [{ success: false, error: "Unavailable" }, 503],
    [{ success: true }, 200],
    [{ success: false, fieldErrors: { name: "Check your name" } }, 400],
  ] as const) {
    globalThis.fetch = async () => Response.json(body, { status });
    await assert.rejects(submitEnquiry(validEnquiry));
  }
  globalThis.fetch = async () => {
    throw new TypeError("Network unavailable");
  };
  await assert.rejects(submitEnquiry(validEnquiry), /could not confirm/);
  globalThis.fetch = async () =>
    Response.json(
      { success: true, enquiryId: "ENQ-confirmed" },
      { status: 201 },
    );
  assert.equal(await submitEnquiry(validEnquiry), "ENQ-confirmed");
});

test("malformed server receipts never show a successful submission", async () => {
  for (const body of [
    null,
    [],
    1,
    { success: true, enquiryId: true },
    { success: true, enquiryId: " " },
  ]) {
    globalThis.fetch = async () => Response.json(body);
    await assert.rejects(submitEnquiry(validEnquiry));
  }
});

test("public configuration rejects placeholders and never includes a server secret", () => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://your-project-ref.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "your-public-key";
  assert.equal(getSupabasePublicConfig(), null);
  fakeSupabase();
  assert.deepEqual(Object.keys(getSupabasePublicConfig()!).sort(), [
    "publishableKey",
    "url",
  ]);
});

test("rate-limit identity trusts Vercel headers only on the Vercel runtime", () => {
  const incoming = new Request("https://site.example", {
    headers: {
      "x-vercel-forwarded-for": "203.0.113.10",
      "x-forwarded-for": "198.51.100.8",
    },
  });
  assert.equal(
    getClientIp(incoming, { vercel: true, production: true }),
    "203.0.113.10",
  );
  assert.equal(
    getClientIp(incoming, { vercel: false, production: false }),
    "127.0.0.1",
  );
  assert.throws(
    () => getClientIp(incoming, { vercel: false, production: true }),
    HttpError,
  );
});

const pendingImage = `/api/media/images/${userId}/${recordId}.png`;
test("pending-media cleanup rejects anonymous, sales and password-only sessions", async () => {
  fakeSupabase();
  assert.equal(
    (
      await discardMedia(
        request("/api/admin/media", "DELETE", { files: [pendingImage] }),
      )
    ).status,
    401,
  );
  fakeSupabase({ role: "sales" });
  assert.equal(
    (
      await discardMedia(
        request("/api/admin/media", "DELETE", { files: [pendingImage] }, jwt()),
      )
    ).status,
    403,
  );
  fakeSupabase();
  assert.equal(
    (
      await discardMedia(
        request(
          "/api/admin/media",
          "DELETE",
          { files: [pendingImage] },
          jwt("aal1"),
        ),
      )
    ).status,
    403,
  );
});
test("pending-media cleanup accepts only the current owner's generated upload paths", () => {
  assert.equal(pendingMediaLocation(pendingImage, userId).bucket, "images");
  for (const path of [
    pendingImage.replace(userId, recordId),
    pendingImage.replace("images", "documents"),
    "/api/media/images/../private.pdf",
    "https://other.example/image.png",
    42,
  ]) {
    assert.throws(() => pendingMediaLocation(path, userId), HttpError);
  }
});
test("unreferenced uploads can be removed through the restricted staff endpoint", async () => {
  const calls = fakeSupabase({ role: "editor" });
  const response = await discardMedia(
    request("/api/admin/media", "DELETE", { files: [pendingImage] }, jwt()),
  );
  assert.equal(response.status, 200);
  const deletion = calls.find(
    (call) => call.path === "/storage/v1/object/images",
  );
  assert.deepEqual(deletion?.body, { prefixes: [`${userId}/${recordId}.png`] });
});
for (const mediaReference of ["products", "settings"] as const)
  test(`cleanup preserves uploads referenced by ${mediaReference}`, async () => {
    const calls = fakeSupabase({ mediaReference });
    assert.equal(
      (
        await discardMedia(
          request(
            "/api/admin/media",
            "DELETE",
            { files: [pendingImage] },
            jwt(),
          ),
        )
      ).status,
      200,
    );
    assert.equal(
      calls.some((call) => call.path.startsWith("/storage/")),
      false,
    );
  });
test("cleanup fails closed when references cannot be checked", async () => {
  const calls = fakeSupabase({ mediaReferenceError: true });
  assert.equal(
    (
      await discardMedia(
        request("/api/admin/media", "DELETE", { files: [pendingImage] }, jwt()),
      )
    ).status,
    503,
  );
  assert.equal(
    calls.some((call) => call.path.startsWith("/storage/")),
    false,
  );
});
test("contact settings validate email and support verified business hours", () => {
  const valid = parseSettingsInput(
    {
      key: "contact",
      value: { email: "sales@example.test", businessHours: "Mon–Fri, 9am–5pm" },
    },
    true,
  );
  assert.deepEqual(valid.value, {
    email: "sales@example.test",
    businessHours: "Mon–Fri, 9am–5pm",
  });
  assert.throws(
    () =>
      parseSettingsInput(
        { key: "contact", value: { email: "invalid-email" } },
        true,
      ),
    (error: unknown) =>
      error instanceof HttpError && Boolean(error.fieldErrors?.value),
  );
});
test("product validation identifies the field that needs correction", () => {
  assert.throws(
    () => parseProductInput({ slug: "BAD SLUG" }),
    (error: unknown) =>
      error instanceof HttpError && Boolean(error.fieldErrors?.slug),
  );
  assert.throws(
    () => parseProductInput({ volume_min: 20, volume_max: 10 }),
    (error: unknown) =>
      error instanceof HttpError && Boolean(error.fieldErrors?.volume_max),
  );
});
