import { Metadata } from "next";
import CategoriesManagement from "@/features/admin/categories/CategoriesManagement";

export const metadata: Metadata = {
  title: "Category & Taxonomy Management | Admin / CMS Prototype",
  description:
    "Maintain the hierarchy used for product discovery and catalogue navigation.",
};

export default function AdminCategoriesPage() {
  return <CategoriesManagement />;
}
