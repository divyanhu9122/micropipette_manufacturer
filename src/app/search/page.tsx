import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SearchPageApp from "@/features/search/SearchPageApp";

export const metadata: Metadata = {
  title: "Search Catalog | MicropipetteManufacturer.in",
  description:
    "Universal search across public laboratory products, micropipette series, categories, and manufacturing brands.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/search",
  },
};

export default function SearchPage() {
  return (
    <main>
      <Header />
      <SearchPageApp />
      <Footer />
    </main>
  );
}
