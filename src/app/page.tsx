"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import CategoriesSection from "@/components/home/CategoriesSection";
import BrandShowcase from "@/components/home/BrandShowcase";
import OemSection from "@/components/home/OemSection";
import ApplicationsSection from "@/components/home/ApplicationsSection";
import FeaturedProductsCarousel from "@/components/home/FeaturedProductsCarousel";
import QualityBar from "@/components/home/QualityBar";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import PartnerCtaBlock from "@/components/home/PartnerCtaBlock";
import QuoteModal from "@/components/ui/QuoteModal";

export default function Home() {
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

      <CategoriesSection />

      <BrandShowcase onSelectBrand={(brand) => handleOpenQuote(`${brand} Range`)} />

      <OemSection />

      <ApplicationsSection />

      <FeaturedProductsCarousel />

      <QualityBar />

      <PartnerMarquee />

      <TestimonialsCarousel />

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
