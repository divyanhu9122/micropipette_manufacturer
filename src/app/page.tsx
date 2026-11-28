import { getPublicContent } from "@/lib/cms/public";
import ManagedPage from "@/components/layout/ManagedPage";
import { productListItem } from "@/lib/cms/presentation";
import type { Metadata } from "next";
import HomePageApp from "@/features/home/HomePageApp";

const defaultMetadata: Metadata = {
  title:
    "Micropipette Manufacturer — Precision Liquid Handling & OEM Solutions | LABXE · SSCIENCES · DANWER",
  description:
    "Central B2B platform for precision micropipettes, multichannel pipettes, laboratory plasticware, and custom OEM manufacturing across LABXE, SSCIENCES, and DANWER brands.",
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 60;
export async function generateMetadata() {
  const managed = (await getPublicContent()).pages.find(
    (page) => page.slug === "home",
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
    alternates: { canonical: "/" },
  };
}
export default async function Home() {
  const content = await getPublicContent();
  const managed = content.pages.find((page) => page.slug === "home");
  if (managed) return <ManagedPage page={managed} />;
  return (
    <HomePageApp
      categories={content.categories}
      brands={content.brands}
      products={content.products
        .filter((product) => product.is_featured)
        .map(productListItem)}
    />
  );
}
