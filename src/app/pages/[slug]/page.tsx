import { notFound } from "next/navigation";
import { getPublicContent } from "@/lib/cms/public";
import ManagedPage from "@/components/layout/ManagedPage";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getPublicContent()).pages.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = (await getPublicContent()).pages.find(
    (item) => item.slug === slug,
  );
  return {
    title: page?.meta_title || page?.title || "Page not found",
    description: page?.meta_description || page?.description || undefined,
    alternates: { canonical: `/pages/${slug}` },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = (await getPublicContent()).pages.find(
    (item) => item.slug === slug,
  );
  if (!page) notFound();
  return <ManagedPage page={page} />;
}
