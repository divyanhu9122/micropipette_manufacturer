import "server-only";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/cms/server";
import { HttpError } from "@/lib/http/errors";
import { authorizeStaff } from "./authorize";
import type { Permission } from "./permissions";

export async function requireStaffPage(
  permission: Permission = "staff:access",
) {
  try {
    const client = await createServerSupabaseClient({ readOnly: true });
    return await authorizeStaff(client, permission);
  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 401 || error.code === "MFA_REQUIRED")
        redirect("/staff/login");
      if (error.status === 503) redirect("/staff/login?reason=unavailable");
      redirect("/staff/access-denied");
    }
    throw error;
  }
}
