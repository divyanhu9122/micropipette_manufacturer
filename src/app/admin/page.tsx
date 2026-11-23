import { redirect } from "next/navigation";
import { requireStaffPage } from "@/lib/auth/page";
import type { Metadata } from "next";
import Dashboard from "@/features/admin/cms/Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard — Operations & CMS",
  description: "Operating view of products, documents, and B2B enquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const { staff } = await requireStaffPage("staff:access");
  if (staff.role === "editor") redirect("/admin/products");
  if (staff.role === "sales") redirect("/admin/enquiries");
  return <Dashboard />;
}
