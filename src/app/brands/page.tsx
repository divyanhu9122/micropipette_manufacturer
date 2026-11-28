import PublicFrame from "@/components/layout/PublicFrame";
import { getPublicContent } from "@/lib/cms/public";
import BrandListingApp from "@/features/brands/BrandListingApp";
import { brandCard } from "@/lib/cms/presentation";
export const revalidate = 60;
export const metadata = {
  title: "Our brands",
  alternates: { canonical: "/brands" },
};
export default async function BrandsPage() {
  const { brands } = await getPublicContent();
  return (
    <PublicFrame>
      <BrandListingApp brands={brands.map(brandCard)} />
    </PublicFrame>
  );
}
