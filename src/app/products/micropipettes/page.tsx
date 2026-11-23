import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import ProductListing from "@/components/products/ProductListing";
import { productListItem } from "@/lib/cms/presentation";
export const revalidate = 60;
export const metadata = { title: "Micropipettes" };
export default async function CataloguePage() {
  const { products, categories } = await getPublicContent();
  const categoryIds = new Set(
    categories.filter((c) => c.slug.includes("micropipette")).map((c) => c.id),
  );
  const records = products.filter((p) => categoryIds.has(p.category_id));
  return (
    <PublicFrame>
      <ProductListing
        title="Micropipettes"
        products={records.map(productListItem)}
      />
    </PublicFrame>
  );
}
