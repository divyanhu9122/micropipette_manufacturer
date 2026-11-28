import { getPublicContent } from "@/lib/cms/public";
import ManagedPage from "@/components/layout/ManagedPage";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApplicationsListingApp from "@/features/applications/ApplicationsListingApp";

const defaultMetadata: Metadata = {
  title:
    "Laboratory Applications & Pipetting Solutions | MicropipetteManufacturer.in",
  description:
    "Explore precision liquid handling applications across molecular biology, clinical diagnostics, pharmaceutical research, food testing, environmental analysis, and academic laboratories.",
  alternates: {
    canonical: "/applications",
  },
};

export const revalidate = 60;
export async function generateMetadata() {
  const managed = (await getPublicContent()).pages.find(
    (page) => page.slug === "applications",
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
    alternates: { canonical: "/applications" },
  };
}
export default async function ApplicationsPage() {
  const content = await getPublicContent();
  const managed = content.pages.find((page) => page.slug === "applications");
  if (managed) return <ManagedPage page={managed} />;
  return (
    <main>
      <Header />
      <ApplicationsListingApp />
      <Footer />
    </main>
  );
}
