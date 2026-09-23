import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApplicationsListingApp from "@/features/applications/ApplicationsListingApp";

export const metadata: Metadata = {
  title: "Laboratory Applications & Pipetting Solutions | MicropipetteManufacturer.in",
  description:
    "Explore precision liquid handling applications across molecular biology, clinical diagnostics, pharmaceutical research, food testing, environmental analysis, and academic laboratories.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/applications",
  },
  openGraph: {
    title: "Laboratory Applications | MicropipetteManufacturer.in",
    description:
      "Explore liquid handling workflows and certified micropipette instrumentation across life science and analytical domains.",
    url: "https://micropipettemanufacturer.in/applications",
  },
};

export default function ApplicationsPage() {
  return (
    <main>
      <Header />
      <ApplicationsListingApp />
      <Footer />
    </main>
  );
}
