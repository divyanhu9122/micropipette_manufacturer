import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductEnquiry from "@/components/products/ProductEnquiry";
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
    title: `Request Quote — ${product.title} | MicropipetteManufacturer.in`,
    description: `Request quotation, pricing, and bulk technical specifications for ${product.title}.`,
    alternates: {
      canonical: `https://micropipettemanufacturer.in/products/${slug}/request-quote`,
    },
  };
}

export default async function ProductEnquiryRoute({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return (
    <main>
      <Header />
      <ProductEnquiry product={product} />
      <Footer />
    </main>
  );
}
