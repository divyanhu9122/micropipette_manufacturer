import { requireStaffPage } from "@/lib/auth/page";
import StaffManager from "@/features/admin/cms/StaffManager";
export const metadata = {
  title: "Staff access — Admin",
  robots: { index: false, follow: false },
};
export default async function StaffPage() {
  const { staff } = await requireStaffPage("staff:manage");
  return <StaffManager currentEmail={staff.email} />;
}
