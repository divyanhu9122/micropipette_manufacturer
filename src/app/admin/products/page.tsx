import { requireStaffPage } from "@/lib/auth/page";
import type { Metadata } from "next";
import ContentManager from "@/features/admin/cms/ContentManager";

export const metadata: Metadata = {
  title: "Products Catalog — Admin",
  description:
    "Manage product records, specifications, and catalogue placement.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProductsPage() {
  const { staff } = await requireStaffPage("content:read");
  return <ContentManager entity="products" role={staff.role} />;
}
