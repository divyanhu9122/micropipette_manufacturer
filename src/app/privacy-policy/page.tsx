import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PrivacyPolicyApp from "@/features/legal/PrivacyPolicyApp";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review the B2B privacy policy for MicropipetteManufacturer.com, detailing commercial quotation handling, data security, international export compliance, and GDPR commitments.",
  alternates: {
    canonical: "/privacy-policy",
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
