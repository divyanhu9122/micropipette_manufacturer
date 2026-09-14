import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/products/ProductDetail";
import {
  getAllProductSlugs,
  getProductBySlug,
} from "@/features/products/product-detail/product-detail.data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: `${product.title} | MicropipetteManufacturer.in`,
    description: product.shortOverview,
    alternates: {
      canonical: `https://micropipettemanufacturer.in/products/${slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return (
    <main>
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </main>
  );
}
