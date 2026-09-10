import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductListing from "@/components/products/ProductListing";

export const metadata: Metadata = {
  title: "Scientific Products | MicropipetteManufacturer.com",
  description:
    "Explore precision laboratory instruments and consumables from LABXE, SSCIENCES and DANWER. Browse by category and brand to find the right solution for your laboratory.",
};

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <ProductListing />
      <Footer />
    </main>
  );
}
