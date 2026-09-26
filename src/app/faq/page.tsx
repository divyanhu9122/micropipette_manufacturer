import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqPageApp from "@/features/faq/FaqPageApp";
import { FAQ_ITEMS } from "@/features/faq/faq.data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | MicropipetteManufacturer.in",
  description:
    "Find quick answers about products, product selection, calibration and support, OEM/private-label requirements, resources and business enquiries.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQs) | MicropipetteManufacturer.in",
    description:
      "Frequently asked questions regarding micropipettes, liquid handling instrumentation, calibration, and OEM manufacturing.",
    url: "https://micropipettemanufacturer.in/faq",
  },
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <FaqPageApp />
      <Footer />
    </main>
  );
}
