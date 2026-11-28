import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactPageApp from "@/features/contact/ContactPageApp";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch for product information, quotations, OEM/private-label requirements, bulk enquiries, distributor opportunities or technical assistance.",
  alternates: {
    canonical: "/contact",
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
