import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import ProductListing from "@/components/products/ProductListing";
import { productListItem } from "@/lib/cms/presentation";
export const revalidate = 60;
export const metadata = {
  title: "Scientific products",
  description: "Explore our published laboratory product catalogue.",
  alternates: { canonical: "/products" },
};
export default async function ProductsPage() {
  const { products } = await getPublicContent();
  return (
    <PublicFrame>
      <ProductListing products={products.map(productListItem)} />
    </PublicFrame>
  );
}
