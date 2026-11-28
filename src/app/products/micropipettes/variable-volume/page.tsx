import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import ProductListing from "@/components/products/ProductListing";
import { productListItem } from "@/lib/cms/presentation";
export const revalidate = 60;
export const metadata = { title: "Variable volume micropipettes" };
export default async function CataloguePage() {
  const { products, categories } = await getPublicContent();
  const categoryIds = new Set(
    categories
      .filter(
        (c) => c.slug.includes("micropipette") || c.slug === "variable-volume",
      )
      .map((c) => c.id),
  );
  let records = products.filter((p) => categoryIds.has(p.category_id));
  records = records.filter(
    (p) =>
      p.categories?.slug === "variable-volume" ||
      p.mechanism?.toLowerCase().replace(/\s+/g, "-") === "variable-volume",
  );
  return (
    <PublicFrame>
      <ProductListing
        title="Variable volume micropipettes"
        products={records.map(productListItem)}
      />
    </PublicFrame>
  );
}
