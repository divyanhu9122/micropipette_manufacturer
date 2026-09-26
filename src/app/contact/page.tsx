import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactPageApp from "@/features/contact/ContactPageApp";

export const metadata: Metadata = {
  title: "Contact Us | MicropipetteManufacturer.in",
  description:
    "Get in touch for product information, quotations, OEM/private-label requirements, bulk enquiries, distributor opportunities or technical assistance.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/contact",
  },
  openGraph: {
    title: "Contact Us | MicropipetteManufacturer.in",
    description:
      "Direct B2B enquiry and technical consultation for micropipettes, liquid handling systems, and scientific instrumentation.",
    url: "https://micropipettemanufacturer.in/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactPageApp />
      <Footer />
    </main>
  );
}
