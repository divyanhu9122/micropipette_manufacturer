import type { Metadata } from "next";
import AdminEnquiriesApp from "@/features/admin/enquiries/AdminEnquiriesApp";

export const metadata: Metadata = {
  title: "B2B Enquiries & Quotes — Admin",
  description:
    "Manage product quotes, OEM inquiries, and bulk laboratory tenders.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminEnquiriesPage() {
  return <AdminEnquiriesApp />;
}
