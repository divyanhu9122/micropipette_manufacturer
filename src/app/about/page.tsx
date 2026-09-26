import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutPageApp from "@/features/about/AboutPageApp";

export const metadata: Metadata = {
  title: "About Us | MicropipetteManufacturer.in",
  description:
    "Learn about MicropipetteManufacturer.in, bringing together laboratory, liquid-handling and scientific-instrument capabilities across LABXE, SSCIENCES and DANWER in one focused B2B product-discovery platform.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/about",
  },
  openGraph: {
    title: "About Us | MicropipetteManufacturer.in",
    description:
      "Precision liquid handling manufacturing and scientific instrument discovery across LABXE, SSCIENCES, and DANWER.",
    url: "https://micropipettemanufacturer.in/about",
  },
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <AboutPageApp />
      <Footer />
    </main>
  );
}
