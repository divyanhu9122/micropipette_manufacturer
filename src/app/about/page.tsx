import { getPublicContent } from "@/lib/cms/public";
import ManagedPage from "@/components/layout/ManagedPage";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutPageApp from "@/features/about/AboutPageApp";

const defaultMetadata: Metadata = {
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

export const revalidate = 60;
export async function generateMetadata() {
  const managed = (await getPublicContent()).pages.find(
    (page) => page.slug === "about",
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
    alternates: { canonical: "/about" },
  };
}
export default async function AboutPage() {
  const content = await getPublicContent();
  const managed = content.pages.find((page) => page.slug === "about");
  if (managed) return <ManagedPage page={managed} />;
  return (
    <main>
      <Header />
      <AboutPageApp />
      <Footer />
    </main>
  );
}
