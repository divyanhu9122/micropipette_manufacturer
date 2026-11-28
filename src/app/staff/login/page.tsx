import type { Metadata } from "next";
import StaffSignInApp from "@/features/auth/StaffSignInApp";
import { getSupabasePublicConfig } from "@/lib/config/supabase";
import { createServerSupabaseClient } from "@/lib/cms/server";
import { authorizeStaff, type StaffAccess } from "@/lib/auth/authorize";
import { HttpError } from "@/lib/http/errors";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Staff sign-in",
  robots: { index: false, follow: false },
};

export default async function StaffSignInPage() {
  const configured = Boolean(getSupabasePublicConfig());
  let access: StaffAccess | undefined;
  if (configured) {
    try {
      const client = await createServerSupabaseClient({ readOnly: true });
      access = await authorizeStaff(client, "staff:access", {
        requireMfa: false,
      });
    } catch (error) {
      if (!(error instanceof HttpError)) throw error;
    }
  }
  if (access && !access.requiresMfa) redirect("/admin");
  const factors = access
    ? await access.client.auth.mfa.listFactors()
    : undefined;
  return (
    <StaffSignInApp
      configured={configured}
      initialMfaRequired={Boolean(access?.requiresMfa)}
      initialFactorId={factors?.data?.totp[0]?.id ?? ""}
    />
  );
}
