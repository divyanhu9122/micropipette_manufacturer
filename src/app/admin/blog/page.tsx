import { requireStaffPage } from "@/lib/auth/page";
import { Metadata } from "next";
import ContentManager from "@/features/admin/cms/ContentManager";

export const metadata: Metadata = {
  title: "Blog Management | Admin / CMS Prototype",
  description:
    "Create and maintain articles supporting the public Blog Listing and Blog Article Detail prototypes.",
};

export default async function AdminBlogPage() {
  const { staff } = await requireStaffPage("content:read");
  return <ContentManager entity="blog" role={staff.role} />;
}
