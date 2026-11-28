import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import nextEnv from "@next/env";
import { createClient } from "@supabase/supabase-js";

const placeholder = /your-project|your[-_]|placeholder|replace[-_]?me/i;
const loopback = new Set(["localhost", "127.0.0.1", "[::1]"]);

function isOrigin(value, production) {
  if (!value || placeholder.test(value)) return false;
  try {
    const url = new URL(value);
    return (
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      url.pathname === "/" &&
      (url.protocol === "https:" ||
        (!production && url.protocol === "http:" && loopback.has(url.hostname)))
    );
  } catch {
    return false;
  }
}

function legacyRole(value) {
  try {
    const parts = value.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(Buffer.from(parts[1], "base64url").toString()).role;
  } catch {
    return null;
  }
}

function keyHasShape(value, prefix, role) {
  if (!value || placeholder.test(value) || /\s/.test(value)) return false;
  return (
    (value.startsWith(prefix) && value.length > prefix.length) ||
    legacyRole(value) === role
  );
}

function config(env) {
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
    publicKey: (
      env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )?.trim(),
    secret: (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_KEY)?.trim(),
  };
}

/** Results contain fixed descriptions and variable names, never their values. */
export function inspectEnvironment(env, { production = false } = {}) {
  const { url, publicKey, secret } = config(env);
  const checks = [];
  const add = (name, valid, hint) =>
    checks.push({ status: valid ? "PASS" : "FAIL", name, hint });
  add(
    "NEXT_PUBLIC_SITE_URL",
    isOrigin(env.NEXT_PUBLIC_SITE_URL, production),
    "Use a website origin; production requires HTTPS.",
  );
  add(
    "NEXT_PUBLIC_SUPABASE_URL",
    isOrigin(url, production),
    "Use the Supabase project origin; local HTTP is allowed only for loopback.",
  );
  add(
    "Supabase publishable / anon key",
    keyHasShape(publicKey, "sb_publishable_", "anon"),
    "Use a publishable key or the legacy anon key, never a server key.",
  );
  add(
    "Supabase server secret / service key",
    keyHasShape(secret, "sb_secret_", "service_role"),
    "Use the server-only secret from the same Supabase project.",
  );
  const token = env.REVALIDATION_TOKEN?.trim();
  add(
    "REVALIDATION_TOKEN",
    Boolean(token && token.length >= 32 && !placeholder.test(token)),
    "Generate a private random token of at least 32 characters.",
  );
  const cron = env.CRON_SECRET?.trim();
  add(
    "CRON_SECRET",
    Boolean(cron && cron.length >= 32 && !placeholder.test(cron)),
    "Generate an independent private random token of at least 32 characters.",
  );

  const privateValues = [
    secret,
    token,
    cron,
    env.RESEND_API_KEY?.trim(),
  ].filter(Boolean);
  for (const [name, value] of Object.entries(env)) {
    if (!name.startsWith("NEXT_PUBLIC_") || !value) continue;
    if (
      value.startsWith("sb_secret_") ||
      value.startsWith("re_") ||
      legacyRole(value) === "service_role" ||
      privateValues.includes(value)
    ) {
      checks.push({
        status: "FAIL",
        name: "Public environment secret exposure",
        hint: "Remove private credentials from NEXT_PUBLIC_ variables and rotate any exposed secret.",
      });
    }
  }
  return checks;
}

const contracts = {
  staff_members: "user_id,role,is_active",
  brands: "id,slug,name,is_active,sort_order",
  categories: "id,slug,name,parent_id,is_active",
  products: "id,slug,title,brand_id,category_id,is_active",
  blog_articles: "id,slug,title,is_published,published_at",
  resources: "id,title,type,file_url,is_public",
  pages: "id,title,slug,body,is_active",
  settings: "*",
  enquiries:
    "id,enquiry_id,name,email,phone,company,country,message,quantity,oem_specifications,internal_notes,product_slug,product_title,enquiry_type,status,ip_address,created_at",
};

/** Only HEAD requests: no rows fetched, migrations applied or records created. */
export async function checkRemoteBackend(env, fetchImpl = globalThis.fetch) {
  if (inspectEnvironment(env).some((check) => check.status === "FAIL")) {
    return [
      {
        status: "FAIL",
        name: "Remote checks",
        hint: "Fix local configuration first.",
      },
    ];
  }
  const { url, publicKey, secret } = config(env);
  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: (input, init) =>
        fetchImpl(input, {
          ...init,
          redirect: "error",
          signal: AbortSignal.timeout(10_000),
        }),
    },
  };
  const publicClient = createClient(url, publicKey, options);
  const serverClient = createClient(url, secret, options);
  const probes = [
    ["Public catalogue connection", publicClient, "brands", "id"],
    ...Object.entries(contracts).map(([table, columns]) => [
      `Server schema: ${table}`,
      serverClient,
      table,
      columns,
    ]),
  ];
  return Promise.all(
    probes.map(async ([name, client, table, columns]) => {
      try {
        const { error } = await client
          .from(table)
          .select(columns, { head: true });
        return {
          status: error ? "FAIL" : "PASS",
          name,
          hint: error
            ? "Check project keys, table/column definitions, API exposure and grants. Provider errors are withheld."
            : "Read-only request accepted. This does not validate RLS policy correctness.",
        };
      } catch {
        return {
          status: "FAIL",
          name,
          hint: "Request failed or timed out. Error details are withheld to protect secrets.",
        };
      }
    }),
  );
}

async function main() {
  const args = new Set(process.argv.slice(2));
  if (
    [...args].some(
      (arg) => !["--remote", "--production", "--help"].includes(arg),
    )
  ) {
    console.error("Usage: npm run check:backend -- [--remote] [--production]");
    process.exitCode = 1;
    return;
  }
  if (args.has("--help")) {
    console.log(
      "Checks configuration without printing values. --remote adds read-only schema requests. --production requires HTTPS origins. This is not a production-readiness audit.",
    );
    return;
  }
  let loadFailed = false;
  nextEnv.loadEnvConfig(
    resolve(dirname(fileURLToPath(import.meta.url)), ".."),
    !args.has("--production"),
    {
      info() {},
      error() {
        loadFailed = true;
      },
    },
  );
  if (loadFailed) throw new Error("Environment loading failed");
  const checks = inspectEnvironment(process.env, {
    production: args.has("--production"),
  });
  if (
    args.has("--remote") &&
    !checks.some((check) => check.status === "FAIL")
  ) {
    checks.push(...(await checkRemoteBackend(process.env)));
  }
  for (const { status, name, hint } of checks) {
    console.log(`${status}: ${name}${status === "FAIL" ? ` — ${hint}` : ""}`);
  }
  console.log(
    "These connection checks do not replace the database policy and application integration tests. Email delivery requires a configured provider.",
  );
  console.log(
    args.has("--remote")
      ? "No database writes or emails were performed."
      : "No network requests were made. Add --remote for read-only connection checks.",
  );
  if (checks.some((check) => check.status === "FAIL")) process.exitCode = 1;
}

if (
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
  main().catch(() => {
    console.error(
      "FAIL: Backend check could not complete. Configuration values and error details were withheld.",
    );
    process.exitCode = 1;
  });
}
