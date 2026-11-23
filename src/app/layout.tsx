import { getPublicContent } from "@/lib/cms/public";
import { getSiteOrigin } from "@/lib/config/site";
import { SiteSettingsProvider } from "@/features/site/SiteSettings";
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

const baseMetadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
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

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublicContent();
  const settings = Object.fromEntries(
    content.settings.map((row) => [row.key, row.value]),
  );
  const name = settings.site?.name || "Micropipette Manufacturer";
  return {
    ...baseMetadata,
    metadataBase: new URL(getSiteOrigin()),
    title: { default: settings.seo?.title || name, template: `%s | ${name}` },
    description:
      settings.seo?.description ||
      settings.site?.description ||
      baseMetadata.description,
    authors: [{ name }],
    creator: name,
    publisher: name,
  };
}
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const content = await getPublicContent();
  const settings = Object.fromEntries(
    content.settings.map((row) => [row.key, row.value]),
  );
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <SiteSettingsProvider
          value={settings}
          navigation={{
            products: content.products.map(({ slug, title }) => ({
              slug,
              title,
            })),
            brands: content.brands.map(({ slug, name }) => ({ slug, name })),
            categories: content.categories.map(({ slug, name }) => ({
              slug,
              name,
            })),
          }}
        >
          {children}
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
