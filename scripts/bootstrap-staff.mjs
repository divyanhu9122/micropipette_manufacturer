import { writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
nextEnv.loadEnvConfig(root, true, { info() {}, error() {} });
class SetupError extends Error {}
async function bootstrap() {
  const reissue = process.argv.includes("--reissue");
  const email = process.argv
    .slice(2)
    .find((value) => !value.startsWith("--"))
    ?.trim()
    .toLowerCase();
  if (!email || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(email))
    throw new SetupError(
      "Pass the first administrator's email as the only argument.",
    );
  const secret =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!secret || !url)
    throw new SetupError("Configure Supabase locally first.");
  const origin = new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  );
  if (
    origin.username ||
    origin.password ||
    (origin.protocol !== "https:" &&
      !(
        origin.protocol === "http:" &&
        ["localhost", "127.0.0.1"].includes(origin.hostname)
      ))
  )
    throw new SetupError("Configure a trusted website origin.");
  const client = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: admins, error: membershipError } = await client
    .from("staff_members")
    .select("user_id")
    .eq("role", "admin")
    .eq("is_active", true)
    .limit(1);
  if (membershipError) throw new SetupError("Staff tables are not ready.");
  if (admins.length && !reissue)
    throw new SetupError(
      "An active administrator already exists. Use the staff-management screen.",
    );
  const matches = await client.rpc("find_staff_auth_user", { p_email: email });
  if (matches.error || !Array.isArray(matches.data))
    throw new SetupError("Auth lookup is unavailable.");
  const existing = matches.data[0];
  if (reissue) {
    const membership = existing
      ? await client
          .from("staff_members")
          .select("user_id")
          .eq("user_id", existing.user_id)
          .eq("is_active", true)
          .maybeSingle()
      : null;
    if (!membership?.data)
      throw new SetupError("No active staff membership exists for this email.");
  }
  const type = existing ? "recovery" : "invite";
  const { data, error } = await client.auth.admin.generateLink({ type, email });
  if (error || !data.user || !data.properties?.hashed_token)
    throw new SetupError(
      "The account could not be prepared. Check whether this email already has an Auth account.",
    );
  const { error: saveError } = reissue
    ? { error: null }
    : await client
        .from("staff_members")
        .upsert(
          { user_id: data.user.id, email, role: "admin", is_active: true },
          { onConflict: "user_id" },
        );
  if (saveError)
    throw new SetupError(
      "Auth account was created, but staff membership needs attention. Check membership before retrying.",
    );
  const target = new URL("/auth/confirm", origin.origin);
  target.searchParams.set("token_hash", data.properties.hashed_token);
  target.searchParams.set("type", type);
  await mkdir(resolve(root, ".tmp"), { recursive: true });
  const file = resolve(root, ".tmp/staff-onboarding.txt");
  await writeFile(
    file,
    `Private, one-time administrator onboarding link. Do not commit or share publicly.\nOpen after the new application is running, choose a password, then enroll an authenticator.\n\n${target.href}\n`,
    { mode: 0o600 },
  );
  console.log(
    "Staff access prepared. The private one-time link is in .tmp/staff-onboarding.txt; no credential was printed and no email was sent.",
  );
}
bootstrap().catch((error) => {
  console.error(
    error instanceof SetupError
      ? error.message
      : "Administrator setup failed. Provider details and secrets were withheld.",
  );
  process.exitCode = 1;
});
