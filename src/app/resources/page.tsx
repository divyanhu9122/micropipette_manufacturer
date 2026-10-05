import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ResourcesApp from "@/features/resources/ResourcesApp";

export const metadata: Metadata = {
  title: "Technical Documentation & Resource Center | MicropipetteManufacturer.in",
  description:
    "Download official product catalogues, technical datasheets, ISO 8655 gravimetric protocols, chemical compatibility guides, and manuals for LABXE, SSCIENCES, and DANWER micropipettes.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/resources",
  },
  openGraph: {
    title: "Technical Documentation & Download Center | MicropipetteManufacturer.in",
    description:
      "Central technical documentation center for liquid handling laboratory instruments, calibration certificates, and engineering specifications.",
    url: "https://micropipettemanufacturer.in/resources",
  },
};

export default function ResourcesPage() {
  return (
    <main>
      <Header />
      <ResourcesApp />
      <Footer />
    </main>
  );
}
