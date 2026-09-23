// Source of Truth:
// 1. MicropipetteManufacturer_Phase3_Brand_Listing_v2(1).html
// 2. MicropipetteManufacturer_Phase3_Brand_Detail_Reusable_Template_v1(1).html
// Status: LOCKED prototype structure adapted for Next.js App Router.

export interface BrandFact {
  label: string;
  value: string;
}

export interface BrandFeaturedProduct {
  id: string;
  slug: string;
  title: string;
  brandTag: string;
  description: string;
  typeLabel: string;
}

export interface BrandCapability {
  num: string;
  title: string;
  desc: string;
}

export interface BrandResource {
  id: string;
  title: string;
  format: string;
  size: string;
}

export interface BrandDetailItem {
  id: string;
  slug: string;
  name: string;
  brandLogoClass: "labxe" | "ssciences" | "danwer" | string;
  badge: string;
  tagline: string;
  shortIntro: string;
  tags: string[];
  aboutStory: string[];
  facts: BrandFact[];
  featuredProducts: BrandFeaturedProduct[];
  capabilities: BrandCapability[];
  resources: BrandResource[];
  officialWebsiteUrl: string;
}

export interface BrandListingCard {
  id: string;
  slug?: string;
  name: string;
  badge: string;
  logoClass?: "labxe" | "ssciences" | "danwer";
  shortIntro: string;
  tags: string[];
  isFuturePlaceholder?: boolean;
}

export const BRAND_LISTING_ITEMS: BrandListingCard[] = [
  {
    id: "labxe",
    slug: "labxe",
    name: "LABXE",
    badge: "Flagship Precision",
    logoClass: "labxe",
    shortIntro:
      "Precision liquid handling and molecular diagnostic instruments engineered for analytical chemistry, life sciences, and clinical research laboratories.",
    tags: ["Micropipettes", "Liquid Handling", "Laboratory Instruments"],
  },
  {
    id: "ssciences",
    slug: "ssciences",
    name: "SSCIENCES",
    badge: "Life Science Grade",
    logoClass: "ssciences",
    shortIntro:
      "High-precision gravimetrically calibrated micropipettes and bottle-top liquid dispensers designed for clinical diagnostics, academic institutes, and OEM volume supply.",
    tags: ["Micropipettes", "Bottle Top Dispensers", "OEM / Bulk"],
  },
  {
    id: "danwer",
    slug: "danwer",
    name: "DANWER",
    badge: "Industrial & Analytical",
    logoClass: "danwer",
    shortIntro:
      "Heavy-duty analytical micro-weighing systems, motorized pipettes, and robust fluid transfer instruments for pharmaceutical and industrial testing facilities.",
    tags: ["Balances", "Micropipettes", "Laboratory Instruments"],
  },
  {
    id: "brand-4",
    name: "BRAND 4",
    badge: "Future Brand Slot",
    shortIntro:
      "Pre-configured CMS brand architecture slot ready for rapid deployment into the unified manufacturing, calibration, and distribution network.",
    tags: ["Micropipettes", "Liquid Handling", "Laboratory Instruments"],
    isFuturePlaceholder: true,
  },
  {
    id: "brand-5",
    name: "BRAND 5",
    badge: "Future Brand Slot",
    shortIntro:
      "Pre-configured CMS brand architecture slot ready for rapid deployment into the unified manufacturing, calibration, and distribution network.",
    tags: ["Micropipettes", "Liquid Handling", "Laboratory Instruments"],
    isFuturePlaceholder: true,
  },
  {
    id: "brand-6",
    name: "BRAND 6",
    badge: "Future Brand Slot",
    shortIntro:
      "Pre-configured CMS brand architecture slot ready for rapid deployment into the unified manufacturing, calibration, and distribution network.",
    tags: ["Micropipettes", "Liquid Handling", "Laboratory Instruments"],
    isFuturePlaceholder: true,
  },
];

export const BRAND_DETAILS: Record<string, BrandDetailItem> = {
  labxe: {
    id: "labxe",
    slug: "labxe",
    name: "LABXE",
    brandLogoClass: "labxe",
    badge: "Flagship Precision Line",
    tagline: "Clinical & Molecular Precision",
    shortIntro:
      "LABXE delivers certified gravimetric liquid handling instruments engineered for molecular biology, analytical chemistry, and hospital clinical diagnostic laboratories worldwide.",
    tags: [
      "Precision Micropipettes",
      "Multichannel Systems",
      "Liquid Handling Consumables",
    ],
    aboutStory: [
      "LABXE is our flagship brand dedicated to advanced molecular research and clinical testing. Built around strict ISO 8655 gravimetric standards, every LABXE instrument provides smooth, ultra-low plunger forces and durable PVDF/fluoropolymer components designed to resist harsh solvents and biological reagents.",
      "Manufactured in our state-of-the-art facility, LABXE micropipettes undergo multi-point gravimetric testing with serial numbering and accredited calibration certification before dispatch to global distributor partners.",
    ],
    facts: [
      { label: "Brand Type", value: "Primary Proprietary Brand" },
      {
        label: "Primary Product Focus",
        value: "Single & Multichannel Micropipettes",
      },
      {
        label: "Official Website",
        value: "https://labxe.com",
      },
      {
        label: "OEM Relationship",
        value: "Manufactured In-House by Parent Facility",
      },
    ],
    featuredProducts: [
      {
        id: "labxe-precision-variable-100-1000",
        slug: "labxe-precision-variable-100-1000",
        title: "LABXE Precision Series Variable Volume (100–1000 µL)",
        brandTag: "LABXE",
        typeLabel: "VARIABLE VOLUME",
        description:
          "Heavy-duty milliliter-class variable pipette crafted from in-house precision injection molds with high chemical resistance.",
      },
      {
        id: "labxe-multichannel-12ch-variable-10-100",
        slug: "labxe-multichannel-12ch-variable-10-100",
        title: "LABXE 12-Channel Variable Volume Micropipette (10–100 µL)",
        brandTag: "LABXE",
        typeLabel: "MULTICHANNEL",
        description:
          "12-channel high-density laboratory instrument designed for fast row-by-row pipetting in standard 96-well microplates.",
      },
      {
        id: "labxe-starter-pack-3-pipettes",
        slug: "labxe-precision-variable-100-1000",
        title: "LABXE Bio-Research 3-Pipette Discovery Pack",
        brandTag: "LABXE",
        typeLabel: "STARTER KIT",
        description:
          "Complete laboratory starter set including three core micropipettes (0.5-10 µL, 10-100 µL, 100-1000 µL) and carousel stand.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Gravimetric Calibration",
        desc: "Each LABXE micropipette is tested in a temperature-controlled 6-place analytical balance bay in compliance with ISO 8655 guidelines.",
      },
      {
        num: "02",
        title: "Ergonomic Stress Relief",
        desc: "Features contoured finger hooks and a patented low-tension spring mechanism to reduce repetitive strain injuries during extended pipetting.",
      },
      {
        num: "03",
        title: "Chemical & Autoclave Stability",
        desc: "Autoclavable mechanical assemblies built with medical-grade PVDF and stainless shafts resist corrosive vapors and heat cycling.",
      },
    ],
    resources: [
      {
        id: "labxe-master-cat",
        title: "LABXE Complete Product Catalogue (2026 Edition)",
        format: "PDF",
        size: "6.2 MB",
      },
      {
        id: "labxe-precision-datasheet",
        title: "LABXE Precision Series Technical Datasheet",
        format: "PDF",
        size: "1.9 MB",
      },
      {
        id: "labxe-chemical-guide",
        title: "Chemical Compatibility & Decontamination Guide",
        format: "PDF",
        size: "1.1 MB",
      },
    ],
    officialWebsiteUrl: "https://labxe.com",
  },
  ssciences: {
    id: "ssciences",
    slug: "ssciences",
    name: "SSCIENCES",
    brandLogoClass: "ssciences",
    badge: "Genomics & Life Science Grade",
    tagline: "Life Science & Genomics",
    shortIntro:
      "SSCIENCES specializes in high-throughput liquid handling, fully autoclavable pipettes, and precision bottle-top dispensers for pharmaceutical formulation and genomics.",
    tags: [
      "Autoclavable Micropipettes",
      "Bottle Top Dispensers",
      "OEM / Bulk Supply",
    ],
    aboutStory: [
      "SSCIENCES is engineered for demanding genomics, molecular biology, and pharmaceutical applications where sterile liquid transfer and zero contamination are paramount. Its signature FAC Plus series features full-body autoclavability at 121°C without disassembly or recalibration.",
      "With high production capacity and direct integration into our primary manufacturing lines, SSCIENCES supplies institutional researchers, government laboratories, and OEM distributors across 40+ countries.",
    ],
    facts: [
      { label: "Brand Type", value: "Primary Proprietary Brand" },
      {
        label: "Primary Product Focus",
        value: "Autoclavable Pipettes & Dispensers",
      },
      {
        label: "Official Website",
        value: "https://ssciences.com",
      },
      {
        label: "OEM Relationship",
        value: "Manufactured In-House by Parent Facility",
      },
    ],
    featuredProducts: [
      {
        id: "ssciences-science-plus-variable-05-10",
        slug: "ssciences-science-plus-variable-05-10",
        title: "Science Plus Variable Volume Micropipette (0.5–10 µL)",
        brandTag: "SSCIENCES",
        typeLabel: "VARIABLE VOLUME",
        description:
          "Precision single-channel variable volume pipette featuring ergonomic finger rest and smooth click-stop volume adjustment.",
      },
      {
        id: "ssciences-fac-plus-fully-autoclavable-20-200",
        slug: "ssciences-fac-plus-fully-autoclavable-20-200",
        title: "FAC Plus Fully Autoclavable Micropipette (20–200 µL)",
        brandTag: "SSCIENCES",
        typeLabel: "VARIABLE VOLUME",
        description:
          "Fully steam sterilizable mechanical pipette at 121°C without disassembly or loss of volumetric calibration.",
      },
      {
        id: "ssciences-multichannel-8ch-variable-20-200",
        slug: "ssciences-multichannel-8ch-variable-20-200",
        title: "SSCIENCES 8-Channel Variable Micropipette (20–200 µL)",
        brandTag: "SSCIENCES",
        typeLabel: "MULTICHANNEL",
        description:
          "Ergonomic 8-channel pipette equipped with a 360° rotating manifold, individual piston assemblies, and uniform tip sealing.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "100% Autoclave Integrity",
        desc: "All thermoset internal and external parts maintain precise volumetric tolerance through repeated steam autoclave cycles at 121°C (20 min).",
      },
      {
        num: "02",
        title: "360° Microplate Manifolds",
        desc: "Multichannel pipetting heads rotate effortlessly to accommodate left- or right-hand workflows across 96- and 384-well standard plates.",
      },
      {
        num: "03",
        title: "High-Volume OEM Availability",
        desc: "Scalable production capacity allows large-batch order fulfillment, private label packaging, and customized OEM volumetric increments.",
      },
    ],
    resources: [
      {
        id: "ssciences-pipette-cat",
        title: "SSCIENCES Pipette Family Catalogue (2026 Edition)",
        format: "PDF",
        size: "5.4 MB",
      },
      {
        id: "ssciences-fac-datasheet",
        title: "FAC Plus Autoclavable Series Technical Datasheet",
        format: "PDF",
        size: "2.1 MB",
      },
      {
        id: "ssciences-autoclave-protocol",
        title: "Steam Sterilization & Autoclaving Protocol Guide",
        format: "PDF",
        size: "1.4 MB",
      },
    ],
    officialWebsiteUrl: "https://ssciences.com",
  },
  danwer: {
    id: "danwer",
    slug: "danwer",
    name: "DANWER",
    brandLogoClass: "danwer",
    badge: "Industrial & Analytical Grade",
    tagline: "Heavy-Duty & Analytical Range",
    shortIntro:
      "DANWER produces rugged motorized pipetting systems, micro-balances, and robust fluid transfer instruments for industrial quality control, petrochemicals, and assay development.",
    tags: [
      "Electronic Pipettes",
      "Analytical Balances",
      "Heavy-Duty Instruments",
    ],
    aboutStory: [
      "DANWER represents rugged industrial-grade performance. Tailored for continuous multi-shift operations in pharmaceutical quality control, petrochemical testing, and high-throughput diagnostic facilities, DANWER equipment emphasizes high mechanical resilience.",
      "Integrating microprocessor-controlled stepper motor drives and electromagnetic compensation balance mechanisms, DANWER guarantees operator-independent dispensing accuracy and ultra-stable gravimetric readings.",
    ],
    facts: [
      { label: "Brand Type", value: "Primary Proprietary Brand" },
      {
        label: "Primary Product Focus",
        value: "Electronic Pipettes & Balances",
      },
      {
        label: "Official Website",
        value: "https://danwer.com",
      },
      {
        label: "OEM Relationship",
        value: "Manufactured In-House by Parent Facility",
      },
    ],
    featuredProducts: [
      {
        id: "danwer-precision-electronic-variable-05-10",
        slug: "danwer-precision-electronic-variable-05-10",
        title: "DANWER Electronic Digital Micropipette (0.5–10 µL)",
        brandTag: "DANWER",
        typeLabel: "ELECTRONIC",
        description:
          "Microprocessor-controlled electronic pipette with stepper motor drive, programmable multi-dispensing, and OLED interface.",
      },
      {
        id: "danwer-analytical-microbalance-01mg",
        slug: "danwer-precision-electronic-variable-05-10",
        title: "DANWER Precision Analytical Balance (0.1 mg / 220 g)",
        brandTag: "DANWER",
        typeLabel: "ANALYTICAL BALANCE",
        description:
          "Electromagnetic force restoration laboratory balance featuring internal motorized calibration and draft-shield chamber.",
      },
      {
        id: "danwer-heavy-duty-dispenser-50ml",
        slug: "danwer-precision-electronic-variable-05-10",
        title: "DANWER Industrial Bottle-Top Dispenser (5–50 mL)",
        brandTag: "DANWER",
        typeLabel: "BOTTLE TOP DISPENSER",
        description:
          "Heavy-duty chemical dispenser with borosilicate glass cylinder, PTFE piston seal, and recirculating valve for zero reagent loss.",
      },
    ],
    capabilities: [
      {
        num: "01",
        title: "Microprocessor Drive Accuracy",
        desc: "Programmable stepper motors eliminate user pipetting rhythm variations, ensuring CV < 0.25% across continuous pipetting cycles.",
      },
      {
        num: "02",
        title: "Heavy-Duty Chemical Shielding",
        desc: "All critical wetted components are machined from sapphire glass, PTFE, and acid-resistant alloys for extreme chemical longevity.",
      },
      {
        num: "03",
        title: "Rapid USB-C Digital Calibration",
        desc: "Electronic firmware allows single-point or two-point recalibration offsets directly entered via digital keypad without physical adjustment.",
      },
    ],
    resources: [
      {
        id: "danwer-master-cat",
        title: "DANWER Industrial Laboratory Catalogue (2026 Edition)",
        format: "PDF",
        size: "5.0 MB",
      },
      {
        id: "danwer-electronic-datasheet",
        title: "DANWER Electronic Series Technical Datasheet",
        format: "PDF",
        size: "2.8 MB",
      },
      {
        id: "danwer-calibration-manual",
        title: "Digital Motor Calibration & Maintenance Manual",
        format: "PDF",
        size: "4.1 MB",
      },
    ],
    officialWebsiteUrl: "https://danwer.com",
  },
};

export function getAllBrandSlugs(): string[] {
  return Object.keys(BRAND_DETAILS);
}

export function getBrandBySlug(slug: string): BrandDetailItem | undefined {
  return BRAND_DETAILS[slug.toLowerCase()];
}

