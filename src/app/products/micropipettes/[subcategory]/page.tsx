import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SubcategoryApp from "@/features/products/subcategory/SubcategoryApp";
import {
  getAllSubcategorySlugs,
  getSubcategoryBySlug,
} from "@/features/products/subcategory/subcategory.data";

type Props = {
  params: Promise<{ subcategory: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSubcategorySlugs();
  return slugs.map((subcategory) => ({ subcategory }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const config = getSubcategoryBySlug(subcategory);

  if (!config) {
    return {
      title: "Subcategory Not Found | MicropipetteManufacturer.in",
    };
  }

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: config.canonicalUrl,
    },
  };
}

export default async function SubcategoryPage({ params }: Props) {
  const { subcategory } = await params;
  const config = getSubcategoryBySlug(subcategory);

  if (!config) {
    notFound();
  }

  return (
    <main>
      <Header />
      <SubcategoryApp config={config} />
      <Footer />
    </main>
  );
}
