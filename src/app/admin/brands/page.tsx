import { Metadata } from "next";
import BrandsManagement from "@/features/admin/brands/BrandsManagement";

export const metadata: Metadata = {
  title: "Brand Management | Admin / CMS Prototype",
  description: "Manage the three confirmed brands in the current project scope.",
};

export default function AdminBrandsPage() {
  return <BrandsManagement />;
}
