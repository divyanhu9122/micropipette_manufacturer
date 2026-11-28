import { createHmac, randomBytes, randomUUID, createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

// Explicit opt-in. Only synthetic records belonging to this run may be removed.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
nextEnv.loadEnvConfig(root, true, { info() {}, error() {} });
class IntegrationFailure extends Error {}
function ensure(condition, label) {
  if (!condition) throw new IntegrationFailure(label);
}
function totp(secret) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  for (const char of secret.toUpperCase().replace(/=+$/, "")) {
    const index = alphabet.indexOf(char);
    ensure(index >= 0, "Unexpected MFA secret encoding");
    bits += index.toString(2).padStart(5, "0");
  }
  const key = Buffer.from(
    (bits.match(/.{8}/g) || []).map((byte) => parseInt(byte, 2)),
  );
  const counter = Buffer.alloc(8);
  counter.writeBigUInt64BE(BigInt(Math.floor(Date.now() / 30000)));
  const hash = createHmac("sha1", key).update(counter).digest(),
    offset = hash[hash.length - 1] & 15;
  return String((hash.readUInt32BE(offset) & 0x7fffffff) % 1_000_000).padStart(
    6,
    "0",
  );
}
async function run() {
  ensure(
    process.argv.includes("--allow-live-fixtures"),
    "Pass --allow-live-fixtures to create and clean up disposable integration records.",
  );
  const origin = new URL(
    process.env.INTEGRATION_BASE_URL || "http://127.0.0.1:3010",
  );
  ensure(
    ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname) &&
      origin.protocol === "http:" &&
      !origin.username &&
      !origin.password &&
      origin.pathname === "/" &&
      !origin.search &&
      !origin.hash,
    "Integration requests are restricted to an owned loopback server.",
  );
  ensure(
    !process.env.RESEND_API_KEY,
    "Run integration checks with email delivery disabled.",
  );
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    secret =
      process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;
  ensure(
    url && key && secret,
    "Configure Supabase before the integration test.",
  );
  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  };
  const service = createClient(url, secret, options),
    user = createClient(url, key, options),
    anon = createClient(url, key, options);
  const runId = randomUUID(),
    slug = `integration-${runId}`,
    email = `${slug}@example.test`,
    helperEmail = `${slug}-editor@example.test`,
    idempotency = randomUUID();
  const registry = {
    runId,
    userIds: [],
    productIds: [],
    brandIds: [],
    categoryIds: [],
    storage: [],
    idempotencyKey: idempotency,
  };
  let token = "",
    checks = 0,
    failed = false;
  const pass = (label) => {
    checks++;
    console.log(`PASS: ${label}`);
  };
  async function api(
    path,
    {
      method = "GET",
      body,
      auth = true,
      headers = {},
      expected = 200,
      raw = false,
    } = {},
  ) {
    const response = await fetch(new URL(path, origin), {
      method,
      redirect: "manual",
      signal: AbortSignal.timeout(30000),
      headers: {
        ...(auth
          ? { Authorization: `Bearer ${token}` }
          : {
              "x-vercel-forwarded-for": `203.0.113.${1 + (parseInt(runId.slice(0, 2), 16) % 250)}`,
              Origin: origin.origin,
            }),
        ...(body === undefined
          ? {}
          : { "Content-Type": raw ? "application/pdf" : "application/json" }),
        ...headers,
      },
      ...(body === undefined
        ? {}
        : { body: raw ? body : JSON.stringify(body) }),
    });
    ensure(
      (Array.isArray(expected) ? expected : [expected]).includes(
        response.status,
      ),
      `${method} ${path.split("?")[0]} returned ${response.status}; expected ${expected}`,
    );
    if (expected >= 300 && expected < 400) return response;
    const text = await response.text();
    ensure(
      !text.includes(secret),
      "Server credentials appeared in an HTTP response",
    );
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }
  async function role(role, isActive = true) {
    const result = await service
      .from("staff_members")
      .update({ role, is_active: isActive })
      .eq("user_id", registry.userIds[0])
      .select("user_id")
      .single();
    ensure(!result.error, "Could not set disposable membership");
  }
  try {
    const create = await service.auth.admin.createUser({
      email,
      password: randomBytes(32).toString("base64url"),
      email_confirm: true,
    });
    ensure(
      !create.error && create.data.user,
      "Synthetic Auth account creation failed",
    );
    registry.userIds.push(create.data.user.id);
    const password = randomBytes(32).toString("base64url");
    ensure(
      !(
        await service.auth.admin.updateUserById(create.data.user.id, {
          password,
        })
      ).error,
      "Synthetic password setup failed",
    );
    ensure(
      !(
        await service.from("staff_members").insert({
          user_id: create.data.user.id,
          email,
          role: "admin",
          is_active: true,
        })
      ).error,
      "Synthetic membership creation failed",
    );
    const login = await user.auth.signInWithPassword({ email, password });
    ensure(
      !login.error && login.data.session,
      "Synthetic password login failed",
    );
    token = login.data.session.access_token;
    const aal1 = token;
    await api("/api/admin/content/products", { expected: 403 });
    pass("Password-only sessions cannot use staff APIs");
    const enrollment = await user.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: `Integration ${runId}`,
    });
    ensure(
      !enrollment.error && enrollment.data?.totp,
      "Synthetic MFA enrollment failed",
    );
    const verified = await user.auth.mfa.challengeAndVerify({
      factorId: enrollment.data.id,
      code: totp(enrollment.data.totp.secret),
    });
    ensure(
      !verified.error && verified.data?.access_token,
      "Synthetic MFA verification failed",
    );
    token = verified.data.access_token;
    await api("/api/admin/content/products");
    pass("Real Supabase TOTP verification grants staff access");
    const jar = new Map();
    const ssr = createServerClient(url, key, {
      cookies: {
        getAll: () => Array.from(jar, ([name, value]) => ({ name, value })),
        setAll: (cookies) => {
          for (const cookie of cookies) jar.set(cookie.name, cookie.value);
        },
      },
      cookieOptions: { secure: false },
    });
    const latest = await user.auth.getSession();
    ensure(latest.data.session, "Synthetic session missing");
    ensure(
      !(await ssr.auth.setSession(latest.data.session)).error,
      "SSR cookie creation failed",
    );
    const cookie = Array.from(jar, ([name, value]) => `${name}=${value}`).join(
      "; ",
    );
    const page = await fetch(new URL("/admin/products", origin), {
      headers: { Cookie: cookie },
      redirect: "manual",
      signal: AbortSignal.timeout(30000),
    });
    ensure(page.status === 200, "Cookie-authenticated admin page failed");
    ensure(
      (await page.text()).includes("Products"),
      "The admin product screen did not render",
    );
    pass("SSR session cookies open the real admin interface");
    const brand = await api("/api/admin/content/brands", {
      method: "POST",
      body: { name: `Integration Brand ${runId}`, slug, is_active: true },
      expected: 201,
    });
    registry.brandIds.push(brand.id);
    const category = await api("/api/admin/content/categories", {
      method: "POST",
      body: { name: `Integration Category ${runId}`, slug, is_active: true },
      expected: 201,
    });
    registry.categoryIds.push(category.id);
    const product = await api("/api/admin/content/products", {
      method: "POST",
      body: {
        title: `Integration instrument ${runId}`,
        slug,
        brand_id: brand.id,
        category_id: category.id,
        is_active: true,
        features: ["Synthetic test record"],
        applications: [],
        channels: 0,
      },
      expected: 201,
    });
    registry.productIds.push(product.id);
    await api(`/products/${slug}`, { auth: false });
    await api(`/products/${slug}-unknown`, { auth: false, expected: 404 });
    const search = await api(`/api/search?q=${runId}`, { auth: false });
    ensure(
      search.items.some(
        (item) =>
          item.url === `/products/${slug}` || item.href === `/products/${slug}`,
      ),
      "Published product missing from search",
    );
    pass("Published catalogue content renders and unknown products return 404");
    await role("editor");
    const draft = await api("/api/admin/content/products", {
      method: "POST",
      body: {
        title: `Integration draft ${runId}`,
        slug: `${slug}-draft`,
        brand_id: brand.id,
        category_id: category.id,
      },
      expected: 201,
    });
    registry.productIds.push(draft.id);
    await api(`/api/admin/content/products/${draft.id}`, {
      method: "PATCH",
      body: { is_active: true },
      expected: 403,
    });
    await api(`/api/admin/content/products/${product.id}`, {
      method: "PATCH",
      body: { title: "Forbidden editor overwrite" },
      expected: 404,
    });
    await api("/api/admin/enquiries", { expected: 403 });
    await api("/api/admin/staff", { expected: 403 });
    const escalation = await user.from("products").insert({
      title: "Forbidden direct publication",
      slug: `${slug}-escalation`,
      brand_id: brand.id,
      category_id: category.id,
      is_active: true,
    });
    ensure(escalation.error, "RLS allowed an editor to publish directly");
    pass("Editor permissions hold in both the API and direct database access");
    await role("admin");
    const helper = await api("/api/admin/staff", {
      method: "POST",
      body: { email: helperEmail, role: "editor" },
      expected: 201,
    });
    ensure(
      typeof helper.onboardingUrl === "string",
      "Private staff onboarding link missing",
    );
    const helperLookup = await service.rpc("find_staff_auth_user", {
      p_email: helperEmail,
    });
    ensure(
      !helperLookup.error && helperLookup.data?.[0],
      "Synthetic invited user lookup failed",
    );
    registry.userIds.push(helperLookup.data[0].user_id);
    const invite = new URL(helper.onboardingUrl);
    const confirmation = await fetch(new URL("/api/auth/confirm", origin), {
      method: "POST",
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
      headers: { "Content-Type": "application/json", Origin: origin.origin },
      body: JSON.stringify({
        tokenHash: invite.searchParams.get("token_hash"),
        type: invite.searchParams.get("type"),
      }),
    });
    ensure(
      confirmation.status === 200,
      "Synthetic onboarding link verification failed",
    );
    const inviteCookies = confirmation.headers
      .getSetCookie()
      .map((value) => value.split(";")[0]);
    ensure(
      inviteCookies.some((value) => value.startsWith("sb-")),
      "Onboarding did not set session cookies",
    );
    const passwordPage = await fetch(new URL("/staff/set-password", origin), {
      headers: { Cookie: inviteCookies.join("; ") },
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });
    ensure(
      passwordPage.status === 200 &&
        (await passwordPage.text()).includes("Choose your password"),
      "Onboarding did not reach password setup",
    );
    const inviteJar = inviteCookies.map((value) => {
      const separator = value.indexOf("=");
      return {
        name: value.slice(0, separator),
        value: decodeURIComponent(value.slice(separator + 1)),
      };
    });
    const inviteClient = createServerClient(url, key, {
      cookies: { getAll: () => inviteJar, setAll: () => {} },
    });
    ensure(
      !(
        await inviteClient.auth.updateUser({
          password: randomBytes(32).toString("base64url"),
        })
      ).error,
      "Synthetic staff password setup failed",
    );
    pass(
      "Private one-time onboarding verifies cookies and allows password setup",
    );
    await api(`/api/admin/staff/${registry.userIds[0]}`, {
      method: "PATCH",
      body: { role: "sales", is_active: true },
      expected: 400,
    });
    pass(
      "Staff provisioning works and administrators cannot remove their own access",
    );
    const payload = {
      name: `Integration Buyer ${runId}`,
      email: `buyer-${runId}@example.test`,
      company: "Synthetic Test Laboratory",
      country: "India",
      type: "Universal / General",
      message:
        "Disposable integration enquiry. This record is removed after verification.",
    };
    const lead = await api("/api/enquiries", {
      method: "POST",
      body: payload,
      auth: false,
      headers: { "Idempotency-Key": idempotency },
      expected: 201,
    });
    ensure(
      /^ENQ-/.test(lead.enquiryId) && lead.attachmentToken,
      "Confirmed enquiry receipt missing",
    );
    const retry = await api("/api/enquiries", {
      method: "POST",
      body: payload,
      auth: false,
      headers: { "Idempotency-Key": idempotency },
      expected: 201,
    });
    ensure(
      retry.enquiryId === lead.enquiryId,
      "Retry created a different enquiry",
    );
    await api("/api/enquiries", {
      method: "POST",
      body: {
        ...payload,
        message: "Changed input with a reused idempotency key.",
      },
      auth: false,
      headers: { "Idempotency-Key": idempotency },
      expected: 409,
    });
    const enquiry = await service
      .from("enquiries")
      .select("id")
      .eq("idempotency_key", idempotency)
      .single();
    ensure(!enquiry.error, "Stored enquiry could not be confirmed");
    pass("Enquiries persist once and repeated submissions reuse the receipt");
    const pdf = Buffer.from("%PDF-1.4\n% Disposable test fixture\n%%EOF");
    registry.storage.push({
      bucket: "enquiry-attachments",
      path: `${enquiry.data.id}/${createHash("sha256").update(pdf).digest("hex")}.pdf`,
    });
    const attachmentPath = `/api/enquiries/${lead.enquiryId}/attachment`,
      uploadHeaders = {
        "X-Enquiry-Upload-Token": lead.attachmentToken,
        "X-File-Name": "integration.pdf",
      };
    await api(attachmentPath, {
      method: "POST",
      body: pdf,
      raw: true,
      auth: false,
      headers: uploadHeaders,
      expected: 201,
    });
    await api(attachmentPath, {
      method: "POST",
      body: pdf,
      raw: true,
      auth: false,
      headers: uploadHeaders,
    });
    await role("sales");
    await api(`/api/admin/enquiries/${enquiry.data.id}`, {
      method: "PATCH",
      body: { status: "read", internal_notes: "Synthetic integration note" },
    });
    const download = await api(
      `/api/admin/enquiries/${enquiry.data.id}/attachment`,
      { expected: 307 },
    );
    ensure(
      new URL(download.headers.get("location")).hostname ===
        new URL(url).hostname,
      "Private file redirect destination incorrect",
    );
    await api("/api/admin/content/products", {
      method: "POST",
      body: {},
      expected: 403,
    });
    const editIdentity = await user
      .from("enquiries")
      .update({ name: "Forbidden customer identity overwrite" })
      .eq("id", enquiry.data.id);
    ensure(editIdentity.error, "Sales could rewrite customer identity");
    await role("editor");
    await api(`/api/admin/enquiries/${enquiry.data.id}/attachment`, {
      expected: 403,
    });
    pass("Private enquiry files and sales notes obey role restrictions");
    await role("admin");
    const imagePath = `${registry.userIds[0]}/${runId}.png`;
    registry.storage.push({ bucket: "images", path: imagePath });
    const image = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a3dUAAAAASUVORK5CYII=",
      "base64",
    );
    ensure(
      !(
        await user.storage
          .from("images")
          .upload(imagePath, image, { contentType: "image/png" })
      ).error,
      "User-scoped image upload failed",
    );
    const media = `/api/media/images/${imagePath}`;
    await api(media, { auth: false, expected: 404 });
    await api(`/api/admin/content/brands/${brand.id}`, {
      method: "PATCH",
      body: { logo_url: media },
    });
    await api(media, { auth: false, expected: 307 });
    pass("Private media becomes public only when linked by published content");
    const publicLeads = await anon.from("enquiries").select("id");
    ensure(
      Boolean(publicLeads.error) || !publicLeads.data?.length,
      "Anonymous access exposed private leads",
    );
    await role("admin", false);
    await api("/api/admin/content/products", { expected: 403 });
    await role("admin");
    const elevated = token;
    token = aal1;
    await api("/api/admin/content/products", { expected: [401, 403] });
    token = elevated;
    ensure(
      !(await user.auth.signOut({ scope: "global" })).error,
      "Synthetic global sign-out failed",
    );
    await api("/api/admin/content/products", { expected: [401, 403] });
    const stale = createClient(url, key, {
      ...options,
      global: { headers: { Authorization: `Bearer ${elevated}` } },
    });
    const oldMembership = await stale.from("staff_members").select("user_id");
    ensure(
      Boolean(oldMembership.error) || !oldMembership.data?.length,
      "A revoked JWT retained direct membership access",
    );
    pass(
      "Disabled memberships and revoked sessions reject previously issued tokens",
    );
  } catch (error) {
    failed = true;
    console.error(
      error instanceof IntegrationFailure
        ? `FAIL: ${error.message}`
        : "FAIL: Integration request failed; sensitive provider details were withheld.",
    );
  } finally {
    let clean = true;
    // Discover only this run's unique identifiers, including ambiguous HTTP writes.
    for (const [table, field, value, list] of [
      ["products", "slug", slug, "productIds"],
      ["products", "slug", `${slug}-draft`, "productIds"],
      ["brands", "slug", slug, "brandIds"],
      ["categories", "slug", slug, "categoryIds"],
    ]) {
      const result = await service.from(table).select("id").eq(field, value);
      if (result.error) clean = false;
      else
        for (const row of result.data || [])
          if (!registry[list].includes(row.id)) registry[list].push(row.id);
    }
    const helper = await service.rpc("find_staff_auth_user", {
      p_email: helperEmail,
    });
    if (helper.error) clean = false;
    else if (
      helper.data?.[0] &&
      !registry.userIds.includes(helper.data[0].user_id)
    )
      registry.userIds.push(helper.data[0].user_id);
    for (const id of registry.userIds) {
      if (
        (
          await service
            .from("staff_members")
            .update({ is_active: false })
            .eq("user_id", id)
        ).error
      )
        clean = false;
    }
    for (const item of registry.storage) {
      if ((await service.storage.from(item.bucket).remove([item.path])).error)
        clean = false;
    }
    if (
      (
        await service
          .from("enquiries")
          .delete()
          .eq("idempotency_key", idempotency)
      ).error
    )
      clean = false;
    for (const [table, list] of [
      ["products", "productIds"],
      ["brands", "brandIds"],
      ["categories", "categoryIds"],
    ])
      for (const id of registry[list])
        if ((await service.from(table).delete().eq("id", id)).error)
          clean = false;
    for (const id of registry.userIds) {
      if ((await service.auth.admin.deleteUser(id)).error) clean = false;
    }
    if (process.env.REVALIDATION_TOKEN) {
      try {
        await api("/api/revalidate", {
          method: "POST",
          auth: false,
          headers: {
            Authorization: `Bearer ${process.env.REVALIDATION_TOKEN}`,
          },
        });
      } catch {
        clean = false;
      }
    }
    if (!clean) {
      await mkdir(resolve(root, ".tmp"), { recursive: true });
      await writeFile(
        resolve(root, ".tmp/integration-cleanup.json"),
        JSON.stringify(registry, null, 2),
      );
      console.error(
        "FAIL: Some disposable fixtures need cleanup; identifiers are in ignored .tmp/integration-cleanup.json.",
      );
      failed = true;
    } else
      pass(
        "Disposable accounts, database records and uploaded files were cleaned up",
      );
  }
  console.log(`${checks} live integration groups passed; no emails were sent.`);
  if (failed) process.exitCode = 1;
}
run().catch((error) => {
  console.error(
    error instanceof IntegrationFailure
      ? error.message
      : "Integration setup failed; credentials were withheld.",
  );
  process.exitCode = 1;
});
