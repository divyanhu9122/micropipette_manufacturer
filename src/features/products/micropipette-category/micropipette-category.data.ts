// Source of truth: "Micropipette Category.html" (Phase 3, exact design system v13)
// Verified product series and coming-soon entries according to requirements.

export type CategoryVisual =
  | { kind: "multi-pipette"; count: 2 | 4 }
  | { kind: "single-pipette"; rotateDeg: number; scale: number }
  | { kind: "controller" };

export interface MicropipetteCategoryItem {
  id: string;
  title: string;
  tag: string;
  visual: CategoryVisual;
  description: string;
  href: string;
}

export const micropipetteCategoryItems: readonly MicropipetteCategoryItem[] = [
  {
    id: "variable-volume",
    title: "Variable Volume",
    tag: "Micropipettes",
    visual: { kind: "multi-pipette", count: 2 },
    description:
      "Precision variable volume micropipettes engineered for flexible volume adjustments, ergonomic comfort, and ISO 8655 gravimetric compliance.",
    href: "/products/micropipettes/variable-volume",
  },
  {
    id: "fixed-volume",
    title: "Fixed Volume",
    tag: "Micropipettes",
    visual: { kind: "single-pipette", rotateDeg: 8, scale: 0.88 },
    description:
      "Dedicated single-volume micropipettes designed for repetitive testing protocols, routine clinical diagnostics, and error-free dispensing.",
    href: "/products/micropipettes/fixed-volume",
  },
  {
    id: "single-channel",
    title: "Single Channel",
    tag: "Channel Type",
    visual: { kind: "single-pipette", rotateDeg: 16, scale: 0.9 },
    description:
      "High-accuracy single-channel pipettes for tubes and vials, engineered with thermal insulation bodies and low plunger resistance.",
    href: "/products/micropipettes/single-channel",
  },
  {
    id: "multichannel",
    title: "Multichannel",
    tag: "Channel Type",
    visual: { kind: "multi-pipette", count: 4 },
    description:
      "8-channel and 12-channel micropipettes optimized for 96-well microplate applications, ELISA assays, and high-throughput handling.",
    href: "/products/micropipettes/multichannel",
  },
  {
    id: "electronic",
    title: "Electronic",
    tag: "Operation",
    visual: { kind: "controller" },
    description:
      "Microprocessor-controlled motorized micropipettes providing automated multidispensing, programmable modes, and zero thumb-strain.",
    href: "/products/micropipettes/electronic",
  },
  {
    id: "mechanical",
    title: "Mechanical",
    tag: "Operation",
    visual: { kind: "single-pipette", rotateDeg: -10, scale: 0.9 },
    description:
      "Rugged manual micropipettes built with chemical-resistant polymers, click-stop volume locks, and steam-autoclavable assemblies.",
    href: "/products/micropipettes/mechanical",
  },
];

export interface MicropipetteSeriesItem {
  id: string;
  name: string;
  brandLabel: string;
  seriesTag: string;
  description?: string;
  specs?: readonly string[];
  imageSrc?: string;
  href?: string;
  hasVerifiedSpecs: boolean;
}

// Exactly eight entries in exact order and spelling requested
export const micropipetteSeriesItems: readonly MicropipetteSeriesItem[] = [
  {
    id: "mini-plus",
    name: "Mini Plus minipipette",
    brandLabel: "SSCIENCES",
    seriesTag: "Minipipette Series",
    hasVerifiedSpecs: false,
  },
  {
    id: "science-plus",
    name: "Science Plus Micropipette",
    brandLabel: "SSCIENCES",
    seriesTag: "Mechanical Variable",
    description:
      "Semi-autoclavable precision mechanical liquid handling series engineered for clinical chemistry and life sciences.",
    specs: ["0.5 – 1000 µL / 1–10 mL", "Single Channel", "Autoclavable Lower Assembly"],
    href: "/products/ssciences-science-plus-variable-05-10",
    hasVerifiedSpecs: true,
  },
  {
    id: "lab-plus",
    name: "Lab Plus Micropipette",
    brandLabel: "LABXE",
    seriesTag: "Precision Series",
    hasVerifiedSpecs: false,
  },
  {
    id: "fac-plus",
    name: "FAC Plus Micropipette",
    brandLabel: "SSCIENCES",
    seriesTag: "Fully Autoclavable",
    description:
      "Fully autoclavable liquid handling instruments with full-body 121°C steam decontamination without disassembly.",
    specs: ["20 – 200 µL", "Single Channel", "121°C Steam Sterilizable"],
    href: "/products/ssciences-fac-plus-fully-autoclavable-20-200",
    hasVerifiedSpecs: true,
  },
  {
    id: "durax",
    name: "DuraX Micropipette",
    brandLabel: "LABXE",
    seriesTag: "Heavy-Duty Series",
    description:
      "High-durability reinforced micropipette engineered for long operating life in demanding laboratory environments.",
    imageSrc: "/images/hero/Micropipette%20DuraX%20%20banner.webp",
    hasVerifiedSpecs: true,
  },
  {
    id: "ergo-plus",
    name: "Ergo Plus Micropipette",
    brandLabel: "LABXE",
    seriesTag: "Ergonomic Series",
    hasVerifiedSpecs: false,
  },
  {
    id: "multi-plus",
    name: "Multi Plus Micropipette",
    brandLabel: "SSCIENCES",
    seriesTag: "Multichannel Series",
    description:
      "Multichannel liquid handling solution for 96-well microplate dispensing and high-throughput diagnostic assays.",
    specs: ["8 & 12 Channel", "360° Rotatable Manifold"],
    href: "/products/micropipettes/multichannel",
    hasVerifiedSpecs: true,
  },
  {
    id: "multi-pro",
    name: "Multi Pro Micropipette",
    brandLabel: "SSCIENCES",
    seriesTag: "Multichannel Pro",
    hasVerifiedSpecs: false,
  },
];

export interface ComingSoonItem {
  id: string;
  name: string;
  label: "Coming Soon";
  note: string;
}

// Exactly two cards for the Coming Soon section
export const comingSoonItems: readonly ComingSoonItem[] = [
  {
    id: "prox",
    name: "ProX Micropipette",
    label: "Coming Soon",
    note: "Next-generation precision instrument in final ISO 8655 gravimetric validation.",
  },
  {
    id: "primo-plus",
    name: "Primo Plus Micropipette",
    label: "Coming Soon",
    note: "Advanced ergonomic liquid handling series scheduled for upcoming portfolio release.",
  },
];
