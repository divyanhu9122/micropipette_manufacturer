import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/cms/server";
import { requireSupabasePublicConfig } from "@/lib/config/supabase";
import { HttpError } from "@/lib/http/errors";
import { assertSameOrigin } from "@/lib/http/request";
import { errorResponse, privateJson } from "@/lib/http/responses";
import { authorizeStaff, type StaffAccess } from "./authorize";
import type { Permission } from "./permissions";

export async function requireStaffRequest(
  request: NextRequest,
  permission: Permission,
  options?: { requireMfa?: boolean },
) {
  const authorization = request.headers.get("authorization");
  const bearer = authorization?.match(
    /^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/i,
  )?.[1];
  const hasCookie = request.cookies
    .getAll()
    .some(({ name }) => /^sb-.+-auth-token(?:\.\d+)?$/.test(name));
  if ((authorization && !bearer) || (!bearer && !hasCookie)) {
    throw new HttpError(
      401,
      "UNAUTHENTICATED",
      "Sign in with an approved staff account.",
    );
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    assertSameOrigin(request, Boolean(bearer));
  }

  const { url, publishableKey } = requireSupabasePublicConfig();
  const client = bearer
    ? createClient(url, publishableKey, {
        global: { headers: { Authorization: `Bearer ${bearer}` } },
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : await createServerSupabaseClient();
  return authorizeStaff(client, permission, {
    ...options,
    accessToken: bearer,
  });
}

export async function staffEndpoint(
  request: NextRequest,
  permission: Permission,
  operation: (access: StaffAccess) => Promise<unknown>,
  status = 200,
) {
  try {
    const access = await requireStaffRequest(request, permission);
    return privateJson(await operation(access), status);
  } catch (error) {
    return errorResponse(
      error,
      `${request.method} ${new URL(request.url).pathname}`,
    );
  }
}
