import ContentManager from "@/features/admin/cms/ContentManager";
import { requireStaffPage } from "@/lib/auth/page";
export const metadata = {
  title: "Website pages — Admin",
  robots: { index: false, follow: false },
};
export default async function PagesManagementPage() {
  const { staff } = await requireStaffPage("content:read");
  return <ContentManager entity="pages" role={staff.role} />;
}
