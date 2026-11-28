import { getPublicContent } from "@/lib/cms/public";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UniversalQuoteApp from "@/features/products/universal-quote/UniversalQuoteApp";

export const metadata: Metadata = {
  title: "Request Quote",
  description:
    "Universal quotation request for micropipettes, bottle top dispensers, laboratory balances, bulk OEM manufacturing, and distributor pricing.",
  alternates: {
    canonical: "/request-quote",
  },
};

export default async function RequestQuotePage() {
  const content = await getPublicContent();
  return (
    <main>
      <Header />
      <UniversalQuoteApp
        products={content.products.map((product) => ({
          id: product.slug,
          name: product.title,
          category: product.categories?.name || "",
          brand: product.brands?.name || "",
        }))}
        categories={content.categories.map((category) => category.name)}
        brands={content.brands.map((brand) => brand.name)}
      />
      <Footer />
    </main>
  );
}
