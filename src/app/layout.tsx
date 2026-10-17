import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://micropipettemanufacturer.in"),
  title: {
    default:
      "Micropipette Manufacturer — Precision Liquid Handling & OEM Solutions",
    template: "%s | MicropipetteManufacturer.in",
  },
  description:
    "Central B2B platform for precision micropipettes, multichannel pipettes, laboratory plasticware, and custom OEM manufacturing across LABXE, SSCIENCES, and DANWER brands.",
  keywords: [
    "micropipette",
    "pipette manufacturer",
    "liquid handling",
    "laboratory equipment",
    "LABXE",
    "SSCIENCES",
    "DANWER",
    "autoclavable micropipette",
    "multichannel pipette",
    "OEM pipette manufacturing",
  ],
  authors: [{ name: "MicropipetteManufacturer.in" }],
  creator: "MicropipetteManufacturer.in",
  publisher: "MicropipetteManufacturer.in",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
