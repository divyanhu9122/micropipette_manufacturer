import { requireStaffPage } from "@/lib/auth/page";
import { Metadata } from "next";
import ContentManager from "@/features/admin/cms/ContentManager";

export const metadata: Metadata = {
  title: "Resource & Document Management | Admin / CMS Prototype",
  description:
    "One central document library for catalogues, brochures, datasheets, manuals, certificates and other technical files.",
};

export default async function AdminResourcesPage() {
  const { staff } = await requireStaffPage("content:read");
  return <ContentManager entity="resources" role={staff.role} />;
}
