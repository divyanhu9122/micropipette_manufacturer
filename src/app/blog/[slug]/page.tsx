import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogDetailApp from "@/features/blog/BlogDetailApp";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/features/blog/blog.data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | MicropipetteManufacturer.in",
    };
  }

  return {
    title: `${post.title} | MicropipetteManufacturer.in`,
    description: post.excerpt,
    alternates: {
      canonical: `https://micropipettemanufacturer.in/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | MicropipetteManufacturer.in`,
      description: post.excerpt,
      url: `https://micropipettemanufacturer.in/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <Header />
      <BlogDetailApp post={post} />
      <Footer />
    </main>
  );
}
