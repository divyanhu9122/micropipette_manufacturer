import type { Metadata } from "next";
import type { ReactNode } from "react";
import { requireStaffPage } from "@/lib/auth/page";
import AdminShell from "@/features/admin/components/AdminShell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { staff } = await requireStaffPage();
  return <AdminShell staff={staff}>{children}</AdminShell>;
}
