import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogListingApp from "@/features/blog/BlogListingApp";

export const metadata: Metadata = {
  title: "Blog — Insights & Technical Articles | MicropipetteManufacturer.in",
  description:
    "Technical guides, product updates, application notes, and industry insights on micropipette calibration, liquid handling, OEM manufacturing, and laboratory best practices.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/blog",
  },
  openGraph: {
    title: "Blog — Insights & Technical Articles | MicropipetteManufacturer.in",
    description:
      "Expert content on micropipette calibration, liquid handling, and B2B laboratory supply from our manufacturing and application science teams.",
    url: "https://micropipettemanufacturer.in/blog",
  },
};

export default function BlogPage() {
  return (
    <main>
      <Header />
      <BlogListingApp />
      <Footer />
    </main>
  );
}
