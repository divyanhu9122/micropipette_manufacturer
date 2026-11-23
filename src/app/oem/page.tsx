import { getPublicContent } from "@/lib/cms/public";
import ManagedPage from "@/components/layout/ManagedPage";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OemPageApp from "@/features/oem/OemPageApp";

const defaultMetadata: Metadata = {
  title:
    "OEM & Private Label Micropipette Manufacturing | MicropipetteManufacturer.in",
  description:
    "Custom logo printing, private-label packaging, bespoke volume ranges, and ISO 8655 gravimetric certified contract micropipette manufacturing for global brands and distributors.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/oem",
  },
};

export const revalidate = 60;
export async function generateMetadata() {
  const managed = (await getPublicContent()).pages.find(
    (page) => page.slug === "oem",
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
    alternates: { canonical: "/oem" },
  };
}
export default async function OemPage() {
  const content = await getPublicContent();
  const managed = content.pages.find((page) => page.slug === "oem");
  if (managed) return <ManagedPage page={managed} />;
  return (
    <main>
      <Header />
      <OemPageApp />
      <Footer />
    </main>
  );
}
