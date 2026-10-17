import type { Metadata } from "next";
import HomePageApp from "@/features/home/HomePageApp";

export const metadata: Metadata = {
  title:
    "Micropipette Manufacturer — Precision Liquid Handling & OEM Solutions | LABXE · SSCIENCES · DANWER",
  description:
    "Central B2B platform for precision micropipettes, multichannel pipettes, laboratory plasticware, and custom OEM manufacturing across LABXE, SSCIENCES, and DANWER brands.",
  alternates: {
    canonical: "https://micropipettemanufacturer.in",
  },
  openGraph: {
    title:
      "Micropipette Manufacturer — Precision Liquid Handling & OEM Solutions",
    description:
      "Leading Indian manufacturer of precision micropipettes, variable and fixed volume liquid handling systems, and certified OEM solutions for global scientific laboratories.",
    url: "https://micropipettemanufacturer.in",
    siteName: "MicropipetteManufacturer.in",
    type: "website",
  },
};

export default function Home() {
  return <HomePageApp />;
}
