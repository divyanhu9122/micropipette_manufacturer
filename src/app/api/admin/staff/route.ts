import type { NextRequest } from "next/server";
import { staffEndpoint } from "@/lib/auth/request";
import { isStaffRole } from "@/lib/auth/permissions";
import { createPrivilegedSupabaseClient } from "@/lib/cms/admin";
import { getSiteOrigin } from "@/lib/config/site";
import { readJsonObject } from "@/lib/http/request";
import { HttpError } from "@/lib/http/errors";
import { databaseError } from "@/lib/http/responses";

export async function GET(request: NextRequest) {
  return staffEndpoint(request, "staff:manage", async ({ client }) => {
    const page = Number(request.nextUrl.searchParams.get("page") || 1);
    if (!Number.isInteger(page) || page < 1 || page > 10000)
      throw new HttpError(400, "INVALID_INPUT", "Choose a valid page.");
    const { data, count, error } = await client
      .from("staff_members")
      .select("user_id,email,role,is_active,created_at", { count: "exact" })
      .order("created_at")
      .order("user_id")
      .range((page - 1) * 50, page * 50 - 1);
    if (error) databaseError(error, "list staff");
    return {
      items: data || [],
      total: count || 0,
      hasMore: count !== null ? page * 50 < count : data?.length === 50,
    };
  });
}

export async function POST(request: NextRequest) {
  return staffEndpoint(
    request,
    "staff:manage",
    async ({ client, staff }) => {
      const body = await readJsonObject(request, 2048);
      if (
        Object.keys(body).some((key) => !["email", "role"].includes(key)) ||
        typeof body.email !== "string" ||
        body.email.length > 254 ||
        !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(body.email) ||
        !isStaffRole(body.role)
      )
        throw new HttpError(
          400,
          "INVALID_INPUT",
          "Enter a valid email and staff role.",
        );
      const email = body.email.trim().toLowerCase();
      if (email === staff.email.toLowerCase())
        throw new HttpError(
          400,
          "INVALID_INPUT",
          "Another administrator must manage your own access.",
        );
      const privileged = createPrivilegedSupabaseClient();
      const { data: matches, error: lookupError } = await privileged.rpc(
        "find_staff_auth_user",
        { p_email: email },
      );
      if (lookupError || !Array.isArray(matches))
        throw new HttpError(
          503,
          "AUTH_UNAVAILABLE",
          "Account provisioning is temporarily unavailable.",
        );
      const existing = matches.length > 0;
      const type = existing ? "recovery" : "invite";
      const { data, error } = await privileged.auth.admin.generateLink({
        type,
        email,
      });
      if (error || !data.user || !data.properties?.hashed_token)
        throw new HttpError(
          503,
          "AUTH_UNAVAILABLE",
          "A staff access link could not be created. Please try again.",
        );
      const { data: member, error: saveError } = await client.rpc(
        "set_staff_member",
        {
          p_user_id: data.user.id,
          p_email: data.user.email || email,
          p_role: body.role,
          p_is_active: true,
        },
      );
      if (saveError) databaseError(saveError, "assign staff membership");
      const target = new URL("/auth/confirm", getSiteOrigin());
      target.searchParams.set("token_hash", data.properties.hashed_token);
      target.searchParams.set("type", type);
      return { member, onboardingUrl: target.href };
    },
    201,
  );
}
