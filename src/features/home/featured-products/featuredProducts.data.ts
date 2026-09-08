export type FeaturedProduct = {
  id: string;
  brand: "LABXE" | "DANWER";
  type: string;
  title: string;
  description: string;
  specs: readonly string[];
  meta: string;
  visual: "single" | "multi" | "tips" | "rack" | "balance" | "controller";
  verificationStatus: "requires-verification";
};

// Approved prototype copy only. Specifications are NOT verified production data.
export const featuredProducts: readonly FeaturedProduct[] = [
  {
    id: "single",
    brand: "LABXE",
    type: "Single Channel",
    title: "LABXE Micropipette Single Channel",
    description:
      "Reliable variable-volume pipette designed for precision liquid handling across daily laboratory workflows.",
    specs: ["0.1 µL – 10 mL", "Autoclavable"],
    meta: "Precision Range",
    visual: "single",
    verificationStatus: "requires-verification",
  },
  {
    id: "multi",
    brand: "LABXE",
    type: "Multi Channel",
    title: "LABXE Micropipette Multi Channel",
    description:
      "Ergonomic multi-channel solution for faster repetitive dispensing in research, diagnostics and screening.",
    specs: ["8 / 12 Channel", "Lab Ready"],
    meta: "High Throughput",
    visual: "multi",
    verificationStatus: "requires-verification",
  },
  {
    id: "tips",
    brand: "LABXE",
    type: "Consumables",
    title: "Universal Pipette Tips",
    description:
      "High-quality compatible tips built for dependable fit, contamination control and consistent transfer accuracy.",
    specs: ["10 µL – 1250 µL", "Universal Fit"],
    meta: "Daily Use",
    visual: "tips",
    verificationStatus: "requires-verification",
  },
  {
    id: "rack",
    brand: "LABXE",
    type: "Storage",
    title: "Tip Box & Rack System",
    description:
      "Structured storage solution for laboratory benches, designed for easy access and clean organization.",
    specs: ["96 Tips / Box", "Bench Friendly"],
    meta: "Easy Handling",
    visual: "rack",
    verificationStatus: "requires-verification",
  },
  {
    id: "balance",
    brand: "DANWER",
    type: "Instrument",
    title: "DANWER Analytical Balance",
    description:
      "Analytical weighing solution with stable performance for quality control, formulation and lab measurement tasks.",
    specs: ["0.0001 g", "Analytical"],
    meta: "Instrument Series",
    visual: "balance",
    verificationStatus: "requires-verification",
  },
  {
    id: "controller",
    brand: "LABXE",
    type: "Accessory",
    title: "Pipette Controller",
    description:
      "Compact controller built for comfortable operation and controlled aspiration/dispensing during routine use.",
    specs: ["Ergonomic Design", "Lightweight"],
    meta: "Accessory Range",
    visual: "controller",
    verificationStatus: "requires-verification",
  },
];
