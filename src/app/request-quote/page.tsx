import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UniversalQuoteApp from "@/features/products/universal-quote/UniversalQuoteApp";

export const metadata: Metadata = {
  title: "Request Quote | MicropipetteManufacturer.in",
  description:
    "Universal quotation request for micropipettes, bottle top dispensers, laboratory balances, bulk OEM manufacturing, and distributor pricing.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/request-quote",
  },
};

export default function RequestQuotePage() {
  return (
    <main>
      <Header />
      <UniversalQuoteApp />
      <Footer />
    </main>
  );
}
