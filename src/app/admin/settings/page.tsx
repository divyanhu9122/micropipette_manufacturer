import { Metadata } from "next";
import SettingsManagement from "@/features/admin/settings/SettingsManagement";

export const metadata: Metadata = {
  title: "SEO & Website Settings | Admin / CMS Prototype",
  description:
    "Manage site identity, page metadata, crawl directives, structured data, sitemaps and public contact settings in one prototype workspace.",
};

export default function AdminSettingsPage() {
  return <SettingsManagement />;
}
