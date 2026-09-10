import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MicropipetteCategory from "@/components/products/MicropipetteCategory";

export const metadata: Metadata = {
  title: "Micropipettes | MicropipetteManufacturer.in",
  description:
    "Micropipettes by classification — variable volume, fixed volume, single channel, multichannel, electronic and mechanical — from LABXE, SSCIENCES and DANWER.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/products/micropipettes",
  },
};

export default function MicropipetteCategoryPage() {
  return (
    <main>
      <Header />
      <MicropipetteCategory />
      <Footer />
    </main>
  );
}
