import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PrivacyPolicyApp from "@/features/legal/PrivacyPolicyApp";

export const metadata: Metadata = {
  title: "Privacy Policy | MicropipetteManufacturer.in",
  description:
    "Review the B2B privacy policy for MicropipetteManufacturer.com, detailing commercial quotation handling, data security, international export compliance, and GDPR commitments.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | MicropipetteManufacturer.in",
    description:
      "Commercial data privacy, quotation processing, and export compliance standards for laboratory equipment procurement.",
    url: "https://micropipettemanufacturer.in/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />
      <PrivacyPolicyApp />
      <Footer />
    </main>
  );
}
