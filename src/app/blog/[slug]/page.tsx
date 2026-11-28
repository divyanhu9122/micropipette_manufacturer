import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import { notFound } from "next/navigation";
import BlogDetailApp from "@/features/blog/BlogDetailApp";
import { blogPost } from "@/lib/cms/presentation";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getPublicContent()).articles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = (await getPublicContent()).articles.find((p) => p.slug === slug);
  if (!post) notFound();
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    alternates: { canonical: `/blog/${slug}` },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { articles } = await getPublicContent();
  const post = articles.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <PublicFrame>
      <BlogDetailApp
        post={blogPost(post)}
        relatedPosts={articles
          .filter((p) => p.id !== post.id)
          .slice(0, 3)
          .map(blogPost)}
      />
    </PublicFrame>
  );
}
