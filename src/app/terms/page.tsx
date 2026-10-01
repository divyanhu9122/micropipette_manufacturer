import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TermsApp from "@/features/legal/TermsApp";

export const metadata: Metadata = {
  title: "Terms & Conditions | MicropipetteManufacturer.in",
  description:
    "Review standard commercial terms, quotation validity, OEM private label conditions, ISO 8655 calibration guarantees, and international shipping terms for MicropipetteManufacturer.com.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/terms",
  },
  openGraph: {
    title: "Terms & Conditions | MicropipetteManufacturer.in",
    description:
      "Commercial purchase terms, OEM manufacturing agreements, and laboratory instrument warranty specifications.",
    url: "https://micropipettemanufacturer.in/terms",
  },
};

export default function TermsPage() {
  return (
    <main>
      <Header />
      <TermsApp />
      <Footer />
    </main>
  );
}
