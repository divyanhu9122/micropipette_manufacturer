import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandListingApp from "@/features/brands/BrandListingApp";

export const metadata: Metadata = {
  title: "Brand Portfolio | MicropipetteManufacturer.in",
  description:
    "Explore our specialized scientific brands — LABXE, SSCIENCES, and DANWER. Compact B2B product portfolios backed by unified ISO 8655 gravimetric manufacturing and export assurance.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/brands",
  },
  openGraph: {
    title: "Brand Portfolio | MicropipetteManufacturer.in",
    description:
      "Explore LABXE, SSCIENCES, and DANWER brand liquid handling, pipetting, and analytical instrumentation.",
    url: "https://micropipettemanufacturer.in/brands",
  },
};

export default function BrandsPage() {
  return (
    <main>
      <Header />
      <BrandListingApp />
      <Footer />
    </main>
  );
}
