import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { HttpError } from "@/lib/http/errors";
import {
  hasPermission,
  isStaffRole,
  type Permission,
  type StaffRole,
} from "./permissions";

export interface StaffIdentity {
  id: string;
  email: string;
  role: StaffRole;
}

export interface StaffAccess {
  client: SupabaseClient;
  staff: StaffIdentity;
  requiresMfa: boolean;
}

export async function authorizeStaff(
  client: SupabaseClient,
  permission: Permission,
  {
    requireMfa = true,
    accessToken,
  }: { requireMfa?: boolean; accessToken?: string } = {},
): Promise<StaffAccess> {
  const { data: userData, error: userError } =
    await client.auth.getUser(accessToken);
  if (
    userError &&
    (userError.status === 0 ||
      (userError.status ?? 0) >= 500 ||
      userError.name === "AuthRetryableFetchError")
  ) {
    throw new HttpError(
      503,
      "AUTHENTICATION_UNAVAILABLE",
      "Staff sign-in could not be verified. Please try again later.",
    );
  }
  if (userError || !userData.user) {
    throw new HttpError(
      401,
      "UNAUTHENTICATED",
      "Sign in with an approved staff account.",
    );
  }
  const user = userData.user;

  const { data: membership, error: membershipError } = await client
    .from("staff_members")
    .select("user_id, role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();
  if (membershipError) {
    throw new HttpError(
      503,
      "AUTHORIZATION_UNAVAILABLE",
      "Staff permissions could not be verified. Please try again later.",
    );
  }
  if (
    !membership ||
    membership.user_id !== user.id ||
    membership.is_active !== true ||
    !isStaffRole(membership.role)
  ) {
    throw new HttpError(
      403,
      "STAFF_ACCESS_REQUIRED",
      "This account does not have active staff access.",
    );
  }
  if (!hasPermission(membership.role, permission)) {
    throw new HttpError(
      403,
      "FORBIDDEN",
      "Your staff role does not allow this operation.",
    );
  }

  // Verify claims before using the MFA assurance level; never decode a cookie and trust it.
  const { data: claimData, error: claimError } =
    await client.auth.getClaims(accessToken);
  if (claimError || !claimData || claimData.claims.sub !== user.id) {
    throw new HttpError(
      401,
      "UNAUTHENTICATED",
      "Your session could not be verified. Please sign in again.",
    );
  }
  const requiresMfa = claimData.claims.aal !== "aal2";
  if (requireMfa && requiresMfa) {
    throw new HttpError(
      403,
      "MFA_REQUIRED",
      "Verify your authenticator code to continue.",
    );
  }
  return {
    client,
    staff: { id: user.id, email: user.email ?? "", role: membership.role },
    requiresMfa,
  };
}
