import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OemPageApp from "@/features/oem/OemPageApp";

export const metadata: Metadata = {
  title: "OEM & Private Label Micropipette Manufacturing | MicropipetteManufacturer.in",
  description:
    "Custom logo printing, private-label packaging, bespoke volume ranges, and ISO 8655 gravimetric certified contract micropipette manufacturing for global brands and distributors.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/oem",
  },
};

export default function OemPage() {
  return (
    <main>
      <Header />
      <OemPageApp />
      <Footer />
    </main>
  );
}
