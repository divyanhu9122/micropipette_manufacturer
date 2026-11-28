import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import { notFound } from "next/navigation";
import ProductListing from "@/components/products/ProductListing";
import { productListItem } from "@/lib/cms/presentation";
export const revalidate = 60;
type Props = { params: Promise<{ subcategory: string }> };
export async function generateStaticParams() {
  return (await getPublicContent()).categories
    .filter((c) => c.parent_id)
    .map((c) => ({ subcategory: c.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { subcategory } = await params;
  const category = (await getPublicContent()).categories.find(
    (c) => c.slug === subcategory,
  );
  return {
    title: category?.name || "Category not found",
    description: category?.description || undefined,
    alternates: { canonical: `/products/micropipettes/${subcategory}` },
  };
}
export default async function CategoryPage({ params }: Props) {
  const { subcategory } = await params;
  const { categories, products } = await getPublicContent();
  const category = categories.find((c) => c.slug === subcategory);
  if (!category) notFound();
  return (
    <PublicFrame>
      <ProductListing
        title={category.name}
        products={products
          .filter((p) => p.category_id === category.id)
          .map(productListItem)}
      />
    </PublicFrame>
  );
}
