import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BrandDetailApp from "@/features/brands/BrandDetailApp";
import {
  getAllBrandSlugs,
  getBrandBySlug,
} from "@/features/brands/brands.data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllBrandSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    return {
      title: "Brand Not Found | MicropipetteManufacturer.in",
    };
  }

  return {
    title: `${brand.name} — Brand Profile & Products | MicropipetteManufacturer.in`,
    description: `${brand.shortIntro} Explore ${brand.name} micropipettes, technical specifications, and catalogues.`,
    alternates: {
      canonical: `https://micropipettemanufacturer.in/brands/${brand.slug}`,
    },
    openGraph: {
      title: `${brand.name} | MicropipetteManufacturer.in`,
      description: brand.shortIntro,
      url: `https://micropipettemanufacturer.in/brands/${brand.slug}`,
    },
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return (
    <main>
      <Header />
      <BrandDetailApp brand={brand} />
      <Footer />
    </main>
  );
}
