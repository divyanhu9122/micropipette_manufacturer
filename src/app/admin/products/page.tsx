import type { Metadata } from "next";
import AdminProductsApp from "@/features/admin/products/AdminProductsApp";

export const metadata: Metadata = {
  title: "Products Catalog — Admin",
  description:
    "Manage product records, specifications, and catalogue placement.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminProductsPage() {
  return <AdminProductsApp />;
}
