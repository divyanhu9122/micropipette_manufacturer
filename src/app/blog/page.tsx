import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import BlogListingApp from "@/features/blog/BlogListingApp";
import { blogPost } from "@/lib/cms/presentation";
export const revalidate = 60;
export const metadata = {
  title: "Articles & technical guides",
  alternates: { canonical: "/blog" },
};
export default async function BlogPage() {
  const { articles } = await getPublicContent();
  return (
    <PublicFrame>
      <BlogListingApp posts={articles.map(blogPost)} />
    </PublicFrame>
  );
}
