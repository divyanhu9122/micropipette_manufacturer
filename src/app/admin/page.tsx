import type { Metadata } from "next";
import AdminDashboardApp from "@/features/admin/dashboard/AdminDashboardApp";

export const metadata: Metadata = {
  title: "Admin Dashboard — Operations & CMS",
  description: "Operating view of products, documents, and B2B enquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboardPage() {
  return <AdminDashboardApp />;
}
