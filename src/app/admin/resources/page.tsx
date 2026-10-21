import { Metadata } from "next";
import ResourcesManagement from "@/features/admin/resources/ResourcesManagement";

export const metadata: Metadata = {
  title: "Resource & Document Management | Admin / CMS Prototype",
  description:
    "One central document library for catalogues, brochures, datasheets, manuals, certificates and other technical files.",
};

export default function AdminResourcesPage() {
  return <ResourcesManagement />;
}
