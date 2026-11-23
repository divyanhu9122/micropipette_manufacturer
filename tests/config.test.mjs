import assert from "node:assert/strict";
import { test } from "node:test";
import {
  inspectEnvironment,
  checkRemoteBackend,
} from "../scripts/check-backend.mjs";

const sample = {
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_fixture_value",
  SUPABASE_SECRET_KEY: "sb_secret_fixture_value",
  REVALIDATION_TOKEN: "a".repeat(64),
  CRON_SECRET: "b".repeat(64),
};
const failures = (env, options) =>
  inspectEnvironment(env, options).filter((check) => check.status === "FAIL");

test("configuration checks reject an unconfigured environment without printing values", () => {
  assert.equal(failures({}).length, 6);
  assert.equal(failures(sample).length, 0);
  const report = JSON.stringify(inspectEnvironment(sample));
  assert.equal(
    Object.values(sample).some((value) => report.includes(value)),
    false,
  );
});

test("production requires HTTPS and local development accepts only loopback HTTP", () => {
  assert.equal(failures(sample, { production: true }).length, 1);
  assert.equal(
    failures(
      { ...sample, NEXT_PUBLIC_SITE_URL: "https://catalogue.example" },
      { production: true },
    ).length,
    0,
  );
  for (const origin of [
    "http://remote.example",
    "https://user:password@catalogue.example",
    "https://catalogue.example/path",
    "https://catalogue.example?key=private",
  ]) {
    assert.equal(
      failures({ ...sample, NEXT_PUBLIC_SITE_URL: origin }).length,
      1,
    );
  }
});

test("server keys and copied private values are rejected in public variables", () => {
  for (const key of [
    sample.SUPABASE_SECRET_KEY,
    sample.REVALIDATION_TOKEN,
    sample.CRON_SECRET,
    "re_fixture_key",
  ]) {
    const report = inspectEnvironment({ ...sample, NEXT_PUBLIC_OTHER: key });
    assert.equal(
      report.some((check) => check.status === "FAIL"),
      true,
    );
    assert.equal(JSON.stringify(report).includes(key), false);
  }
  assert.equal(
    failures({
      ...sample,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: sample.SUPABASE_SECRET_KEY,
    }).length >= 1,
    true,
  );
});

test("placeholders, swapped keys and missing revalidation tokens fail validation", () => {
  for (const env of [
    {
      ...sample,
      NEXT_PUBLIC_SUPABASE_URL: "https://your-project-ref.supabase.co",
    },
    {
      ...sample,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_REPLACE_ME",
    },
    {
      ...sample,
      SUPABASE_SECRET_KEY: sample.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    },
    { ...sample, REVALIDATION_TOKEN: "" },
  ])
    assert.equal(failures(env).length > 0, true);
});

test("legacy key shapes are accepted only in their expected role", () => {
  const jwt = (role) =>
    [
      "e30",
      Buffer.from(JSON.stringify({ role })).toString("base64url"),
      "fixture",
    ].join(".");
  const legacy = {
    ...sample,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "",
    SUPABASE_SECRET_KEY: "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt("anon"),
    SUPABASE_SERVICE_KEY: jwt("service_role"),
  };
  assert.equal(failures(legacy).length, 0);
  assert.equal(
    failures({ ...legacy, NEXT_PUBLIC_SUPABASE_ANON_KEY: jwt("service_role") })
      .length > 0,
    true,
  );
});

test("remote probes use HEAD with bounded requests and never follow redirects", async () => {
  const calls = [];
  const checks = await checkRemoteBackend(sample, async (url, init) => {
    calls.push({ url: new URL(url), init });
    return new Response(null, { status: 200 });
  });
  assert.equal(checks.length, 10);
  assert.equal(
    checks.every((check) => check.status === "PASS"),
    true,
  );
  assert.equal(
    calls.every(
      ({ init }) =>
        init.method === "HEAD" &&
        init.redirect === "error" &&
        init.signal instanceof AbortSignal,
    ),
    true,
  );
  assert.equal(
    calls.some(
      ({ url }) =>
        url.pathname.includes("/enquiries") &&
        url.searchParams.get("select").includes("oem_specifications"),
    ),
    true,
  );
});

test("provider failures cannot echo secret values into the report", async () => {
  const sensitive = "provider-error-containing-private-credentials";
  const checks = await checkRemoteBackend(
    sample,
    async () =>
      new Response(JSON.stringify({ message: sensitive }), { status: 403 }),
  );
  assert.equal(
    checks.every((check) => check.status === "FAIL"),
    true,
  );
  assert.equal(JSON.stringify(checks).includes(sensitive), false);
  assert.equal(
    JSON.stringify(checks).includes(sample.SUPABASE_SECRET_KEY),
    false,
  );
});

test("an unconfigured remote check makes no requests", async () => {
  let requests = 0;
  const checks = await checkRemoteBackend({}, async () => {
    requests++;
    throw new Error("unexpected request");
  });
  assert.equal(requests, 0);
  assert.equal(checks[0].status, "FAIL");
});
