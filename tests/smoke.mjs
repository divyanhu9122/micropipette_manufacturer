import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const target = new URL(process.argv[2] || "http://127.0.0.1:3010");
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(target.hostname),
  "Smoke checks are restricted to a local test server.",
);
const base = target.origin;
let checks = 0;

for (const route of [
  "/",
  "/products",
  "/resources",
  "/contact",
  "/staff/login",
]) {
  const response = await fetch(base + route, {
    signal: AbortSignal.timeout(15_000),
  });
  const html = await response.text();
  assert.equal(response.status, 200, route);
  assert.ok(html.includes("<html"), `${route} did not return a page`);
  checks++;
}

for (const route of [
  "/admin",
  "/admin/enquiries",
  "/admin/products",
  "/admin/settings",
]) {
  const response = await fetch(base + route, { redirect: "manual" });
  // Next.js may stream a 200 shell before the server-page guard redirects.
  if ([307, 308].includes(response.status)) {
    assert.ok(
      response.headers.get("location")?.includes("/staff/login"),
      route,
    );
  } else {
    const html = await response.text();
    assert.equal(response.status, 200, route);
    assert.match(
      html,
      /<meta[^>]+http-equiv="refresh"[^>]+\/staff\/login/,
      route,
    );
    assert.ok(
      !html.includes("dataTable") && !html.includes("Recent activity"),
      `${route} exposed private interface content`,
    );
  }
  assert.match(response.headers.get("cache-control"), /private.*no-store/);
  checks++;
}

const id = "22222222-2222-4222-8222-222222222222";
const administrativeRoutes = [
  ["GET", "/api/admin/products"],
  ["POST", "/api/admin/products"],
  ["PATCH", `/api/admin/products/${id}`],
  ["DELETE", `/api/admin/products/${id}`],
  ["GET", "/api/admin/blog"],
  ["POST", "/api/admin/blog"],
  ["PATCH", `/api/admin/blog/${id}`],
  ["DELETE", `/api/admin/blog/${id}`],
  ["GET", "/api/admin/brands"],
  ["POST", "/api/admin/brands"],
  ["GET", "/api/admin/enquiries"],
  ["PATCH", `/api/admin/enquiries/${id}`],
  ["GET", "/api/auth/session"],
  ["GET", "/api/admin/content/products"],
  ["POST", "/api/admin/content/brands"],
  ["PATCH", `/api/admin/content/pages/${id}`],
  ["GET", "/api/admin/staff"],
  ["POST", "/api/admin/staff"],
  ["PATCH", `/api/admin/staff/${id}`],
  ["GET", `/api/admin/enquiries/${id}/attachment`],
];
for (const [method, route] of administrativeRoutes) {
  const response = await fetch(base + route, {
    method,
    headers: { "content-type": "application/json" },
    ...(["POST", "PATCH"].includes(method) ? { body: "{}" } : {}),
  });
  assert.equal(response.status, 401, `${method} ${route}`);
  assert.match(response.headers.get("cache-control"), /private.*no-store/);
  checks++;
}

const payload = {
  name: "Local Review",
  email: "local@example.com",
  company: "Test Laboratory",
  country: "India",
  type: "Universal / General",
  message:
    "Local read-only verification; this payload is never submitted as a valid enquiry.",
};
let response = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { "content-type": "application/json", origin: base },
  // Keep the payload invalid so this script can never create a real enquiry.
  body: JSON.stringify({ ...payload, name: "A" }),
});
assert.equal(response.status, 400);
const body = await response.json();
assert.equal(body.success, false);
assert.equal(body.enquiryId, undefined);
checks++;

response = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: { "content-type": "application/json", origin: base },
  body: "{",
});
assert.equal(response.status, 400);
checks++;
response = await fetch(base + "/api/enquiries", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    origin: "https://other.example",
  },
  body: JSON.stringify(payload),
});
assert.equal(response.status, 403);
checks++;
response = await fetch(base + "/api/revalidate", { method: "POST" });
assert.equal(response.status, 401);
checks++;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(path.join(directory, entry.name))
      : [path.join(directory, entry.name)],
  );
}
for (const file of walk(".next/static").filter((file) =>
  file.endsWith(".js"),
)) {
  assert.ok(
    !/SUPABASE_SECRET_KEY|SUPABASE_SERVICE_KEY/.test(
      readFileSync(file, "utf8"),
    ),
    `Privileged configuration reference found in client bundle: ${file}`,
  );
}
checks++;
console.log(
  `Passed ${checks} local production smoke checks; no records were created and no emails were sent.`,
);
