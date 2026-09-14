import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VariableVolumeSubcategory from "@/components/products/VariableVolumeSubcategory";

export const metadata: Metadata = {
  title: "Variable Volume Micropipettes | MicropipetteManufacturer.in",
  description:
    "Explore precision variable volume micropipettes from LABXE, SSCIENCES, and DANWER. Browse single channel, multichannel, mechanical, and electronic options with volume ranges from 0.1 µL to 10 mL.",
  alternates: {
    canonical:
      "https://micropipettemanufacturer.in/products/micropipettes/variable-volume",
  },
};

export default function VariableVolumeSubcategoryPage() {
  return (
    <main>
      <Header />
      <VariableVolumeSubcategory />
      <Footer />
    </main>
  );
}
