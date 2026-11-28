import { getPublicContent } from "@/lib/cms/public";
import ManagedPage from "@/components/layout/ManagedPage";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqPageApp from "@/features/faq/FaqPageApp";
import { FAQ_ITEMS } from "@/features/faq/faq.data";

const defaultMetadata: Metadata = {
  title: "Frequently Asked Questions (FAQs) | MicropipetteManufacturer.in",
  description:
    "Find quick answers about products, product selection, calibration and support, OEM/private-label requirements, resources and business enquiries.",
  alternates: {
    canonical: "/faq",
  },
};

export const revalidate = 60;
export async function generateMetadata() {
  const managed = (await getPublicContent()).pages.find(
    (page) => page.slug === "faq",
  );
  return {
    ...defaultMetadata,
    title:
      managed?.meta_title ||
      managed?.title ||
      (typeof defaultMetadata.title === "string"
        ? defaultMetadata.title.split("|")[0].trim()
        : defaultMetadata.title),
    description:
      managed?.meta_description ||
      managed?.description ||
      defaultMetadata.description,
    alternates: { canonical: "/faq" },
  };
}
export default async function FaqPage() {
  const content = await getPublicContent();
  const managed = content.pages.find((page) => page.slug === "faq");
  if (managed) return <ManagedPage page={managed} />;
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
