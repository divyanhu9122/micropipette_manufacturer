import { requireStaffPage } from "@/lib/auth/page";
import { Metadata } from "next";
import ContentManager from "@/features/admin/cms/ContentManager";

export const metadata: Metadata = {
  title: "Category & Taxonomy Management | Admin / CMS Prototype",
  description:
    "Maintain the hierarchy used for product discovery and catalogue navigation.",
};

export default async function AdminCategoriesPage() {
  const { staff } = await requireStaffPage("content:read");
  return <ContentManager entity="categories" role={staff.role} />;
}
