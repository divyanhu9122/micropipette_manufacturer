import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import { notFound } from "next/navigation";
import ProductEnquiry from "@/components/products/ProductEnquiry";
import { productDetail } from "@/lib/cms/presentation";
export const revalidate = 60;
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() {
  return (await getPublicContent()).products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = (await getPublicContent()).products.find(
    (p) => p.slug === slug,
  );
  if (!product) notFound();
  return {
    title: `Request quote — ${product.title}`,
    description: `Request a quotation for ${product.title}.`,
    alternates: { canonical: `/products/${slug}/request-quote` },
  };
}
export default async function QuotePage({ params }: Props) {
  const { slug } = await params;
  const product = (await getPublicContent()).products.find(
    (p) => p.slug === slug,
  );
  if (!product) notFound();
  return (
    <PublicFrame>
      <ProductEnquiry product={productDetail(product)} />
    </PublicFrame>
  );
}
