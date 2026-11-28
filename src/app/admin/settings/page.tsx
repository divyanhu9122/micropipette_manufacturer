import { requireStaffPage } from "@/lib/auth/page";
import { Metadata } from "next";
import ContentManager from "@/features/admin/cms/ContentManager";

export const metadata: Metadata = {
  title: "SEO & Website Settings | Admin",
  description:
    "Manage site identity, page metadata, crawl directives, structured data, sitemaps and public contact settings in one workspace.",
};

export default async function AdminSettingsPage() {
  const { staff } = await requireStaffPage("settings:manage");
  return <ContentManager entity="settings" role={staff.role} />;
}
