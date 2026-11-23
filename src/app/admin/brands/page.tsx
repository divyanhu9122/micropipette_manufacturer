import { requireStaffPage } from "@/lib/auth/page";
import { Metadata } from "next";
import ContentManager from "@/features/admin/cms/ContentManager";

export const metadata: Metadata = {
  title: "Brand Management | Admin / CMS Prototype",
  description:
    "Manage the three confirmed brands in the current project scope.",
};

export default async function AdminBrandsPage() {
  const { staff } = await requireStaffPage("content:read");
  return <ContentManager entity="brands" role={staff.role} />;
}
