import { Metadata } from "next";
import BlogManagement from "@/features/admin/blog/BlogManagement";

export const metadata: Metadata = {
  title: "Blog Management | Admin / CMS Prototype",
  description:
    "Create and maintain articles supporting the public Blog Listing and Blog Article Detail prototypes.",
};

export default function AdminBlogPage() {
  return <BlogManagement />;
}
