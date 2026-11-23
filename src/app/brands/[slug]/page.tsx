import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import { notFound } from "next/navigation";
import BrandDetailApp from "@/features/brands/BrandDetailApp";
import { brandDetail } from "@/lib/cms/presentation";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getPublicContent()).brands.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const brand = (await getPublicContent()).brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  return {
    title: brand.name,
    description: brand.description || undefined,
    alternates: { canonical: `/brands/${slug}` },
  };
}
export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const { brands, products, resources } = await getPublicContent();
  const brand = brands.find((b) => b.slug === slug);
  if (!brand) notFound();
  return (
    <PublicFrame>
      <BrandDetailApp brand={brandDetail(brand, products, resources)} />
    </PublicFrame>
  );
}
