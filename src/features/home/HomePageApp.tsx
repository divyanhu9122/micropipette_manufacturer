"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import {
  CmsCategories,
  CmsBrands,
  CmsFeaturedProducts,
} from "./CmsHomeSections";
import OemSection from "@/components/home/OemSection";
import ApplicationsSection from "@/components/home/ApplicationsSection";
import PartnerCtaBlock from "@/components/home/PartnerCtaBlock";
import QuoteModal from "@/components/ui/QuoteModal";
import type { Category, Brand } from "@/types/cms";
import type { ProductListItem } from "@/features/products/product-listing/product-listing.data";

export default function HomePageApp({
  categories = [],
  brands = [],
  products = [],
}: {
  categories?: Category[];
  brands?: Brand[];
  products?: ProductListItem[];
}) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleOpenQuote = (productName = "") => {
    setSelectedProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <main>
      <Header onOpenQuote={() => handleOpenQuote()} />

      <HeroSlider onOpenQuote={() => handleOpenQuote()} />

      <CmsCategories categories={categories} />

      <CmsBrands brands={brands} />

      <OemSection />

      <ApplicationsSection />

      <CmsFeaturedProducts products={products} />

      <PartnerCtaBlock onOpenQuote={() => handleOpenQuote()} />

      <Footer />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </main>
  );
}
