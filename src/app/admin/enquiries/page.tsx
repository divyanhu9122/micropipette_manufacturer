import { requireStaffPage } from "@/lib/auth/page";
import type { Metadata } from "next";
import EnquiriesManager from "@/features/admin/cms/EnquiriesManager";

export const metadata: Metadata = {
  title: "B2B Enquiries & Quotes — Admin",
  description:
    "Manage product quotes, OEM inquiries, and bulk laboratory tenders.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminEnquiriesPage() {
  const { staff } = await requireStaffPage("enquiries:read");
  return <EnquiriesManager role={staff.role} />;
}
