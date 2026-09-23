export interface OemCapability {
  id: string;
  icon: string;
  title: string;
  description: string;
  details: readonly string[];
}

export interface OemProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export interface OemFaqItem {
  question: string;
  answer: string;
}

export const oemCapabilities: readonly OemCapability[] = [
  {
    id: "branding",
    icon: "🏷️",
    title: "Logo & Brand Customization",
    description:
      "Showcase your brand identity directly on precision laboratory instruments with industrial-grade durability.",
    details: [
      "High-resolution laser marking and multi-color pad printing",
      "Custom company name, logo, and brand typeface on pipette barrels",
      "Custom color-coded volume push buttons and finger hooks",
      "Private-label serial number formatting and custom barcodes",
    ],
  },
  {
    id: "packaging",
    icon: "📦",
    title: "Private-Label Packaging & Manuals",
    description:
      "Complete end-to-end retail packaging designed according to your brand's graphic guidelines.",
    details: [
      "Custom-printed outer gift boxes and protective blister inserts",
      "User manuals and quick-start guides with your logo & company info",
      "Branded individual calibration certificates with your letterhead",
      "Multilingual label printing and custom distributor barcodes",
    ],
  },
  {
    id: "engineering",
    icon: "⚙️",
    title: "Bespoke Volume & Tip Cone Tooling",
    description:
      "Engineering flexibility to modify volume ranges, increments, and tip cone geometries for specialized applications.",
    details: [
      "Pre-set custom fixed-volume calibrations for dedicated diagnostic kits",
      "Custom tip cone dimensions for specialized non-standard tip fittings",
      "High chemical-resistance seal compounding (PTFE, FFKM, FKM)",
      "Reverse-pipetting mechanisms and low-force plunger springs",
    ],
  },
  {
    id: "controllers",
    icon: "🔋",
    title: "Electronic & Controller OEM",
    description:
      "Contract manufacturing of motorized electronic pipettes and motorized serological controllers.",
    details: [
      "Custom firmware startup splash screens displaying your company name",
      "Tailored dispensing speeds, aliquot modes, and battery management",
      "Custom housing colorways and branded silicon nosecones",
      "Universal USB-C charging stands and branded charging cradles",
    ],
  },
];

export const oemProcessSteps: readonly OemProcessStep[] = [
  {
    step: "01",
    title: "Requirements & Specification Review",
    description:
      "We review your product targets, volume requirements (MOQ), color preferences, branding assets, and target delivery schedule.",
    duration: "1–2 Business Days",
  },
  {
    step: "02",
    title: "Tooling & Custom Sample Evaluation",
    description:
      "Our engineering team produces branded prototype samples with your logo, colorways, and packaging proofs for in-lab evaluation.",
    duration: "7–10 Business Days",
  },
  {
    step: "03",
    title: "Pilot Run & Gravimetric Validation",
    description:
      "Production of pilot batch under Class 100,000 cleanroom conditions with 10-point ISO 8655 gravimetric testing.",
    duration: "2 Weeks",
  },
  {
    step: "04",
    title: "Full-Scale Production & Quality Inspection",
    description:
      "Batch manufacturing with 100% optical alignment, leakage tests, thumb-force measurement, and QA sign-off.",
    duration: "3–4 Weeks",
  },
  {
    step: "05",
    title: "Private Packaging & Global Logistics",
    description:
      "Custom packaging, palletization, export documentation (CO, Certificate of Analysis), and international sea/air freight forwarding.",
    duration: "Coordinated to Schedule",
  },
];

export const oemFaqs: readonly OemFaqItem[] = [
  {
    question: "What is the Minimum Order Quantity (MOQ) for OEM / Private Label?",
    answer:
      "Our flexible OEM tiers start at low MOQs of 50–100 units for standard laser logo marking. For full private-label packaging (custom boxes, branded manuals, custom colored parts), typical MOQs start at 250–500 units per model series.",
  },
  {
    question: "Can calibration certificates be issued under our company name?",
    answer:
      "Yes. We generate ISO 8655 gravimetric calibration certificates bearing your company name, logo, and address. Each certificate contains individual test data across 10 gravimetric weighings per test volume with traceable reference balance serial numbers.",
  },
  {
    question: "What file formats do you need for our logo and packaging artwork?",
    answer:
      "We accept vector files in AI, EPS, SVG, or high-resolution vector PDF formats. We provide standardized dieline templates for packaging boxes, blister cards, and manuals.",
  },
  {
    question: "Are your manufacturing facilities certified?",
    answer:
      "Yes. Our manufacturing facilities operate under ISO 9001:2015 and ISO 13485:2016 quality management systems. All pipettes are calibrated in an environmentally controlled laboratory conforming to ISO 8655 standards.",
  },
  {
    question: "How do you handle confidentiality and proprietary designs?",
    answer:
      "We execute standard bilateral Non-Disclosure Agreements (NDAs) before discussing custom engineering, proprietary volume specifications, or distributor territorial exclusivity.",
  },
];
