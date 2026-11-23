import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/products/ProductDetail";
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
    title: product.meta_title || product.title,
    description:
      product.meta_description || product.short_description || undefined,
    alternates: { canonical: `/products/${slug}` },
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { products } = await getPublicContent();
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  const detail = productDetail(product, products);
  return (
    <PublicFrame>
      <ProductDetail
        product={detail}
        relatedProducts={products
          .filter((p) => detail.relatedSlugs.includes(p.slug))
          .map((p) => productDetail(p))}
      />
    </PublicFrame>
  );
}
