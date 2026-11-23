import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/cms/server";
import { authorizeStaff } from "@/lib/auth/authorize";
import SetPassword from "@/features/auth/SetPassword";
export const metadata = {
  title: "Set your password",
  robots: { index: false, follow: false },
};
export default async function PasswordPage() {
  try {
    const client = await createServerSupabaseClient({ readOnly: true });
    await authorizeStaff(client, "staff:access", { requireMfa: false });
  } catch {
    redirect("/staff/login");
  }
  return <SetPassword />;
}
