// Source of Truth:
// MicropipetteManufacturer_Phase3_Applications_Listing_v1(1).html
// Status: LOCKED prototype adapted for Next.js App Router.

export interface ApplicationItem {
  id: string;
  slug: string;
  title: string;
  tag: string;
  description: string;
  iconName: "dna" | "clinical" | "pharma" | "food" | "environmental" | "academic";
  workflows: string[];
  recommendedInstruments: string[];
}

export const APPLICATIONS_DATA: ApplicationItem[] = [
  {
    id: "molecular-biology",
    slug: "molecular-biology",
    title: "Molecular Biology",
    tag: "APPLICATION",
    description:
      "Ultra-low volume pipetting solutions designed for delicate DNA/RNA extraction, PCR master mix preparation, qPCR assays, cDNA synthesis, and high-throughput NGS library preparation with zero aerosol contamination.",
    iconName: "dna",
    workflows: [
      "PCR / qPCR Setup",
      "Next-Gen Sequencing (NGS)",
      "DNA / RNA Extraction",
      "Gel Electrophoresis Loading",
    ],
    recommendedInstruments: [
      "Variable Volume 0.5–10 µL",
      "Multichannel Pipettes",
      "Filter Pipette Tips",
    ],
  },
  {
    id: "clinical-diagnostics",
    slug: "clinical-diagnostics",
    title: "Clinical & Diagnostic Labs",
    tag: "APPLICATION",
    description:
      "Gravimetrically certified single and multichannel pipettes providing rapid, reproducible liquid dispensing for blood serum processing, ELISA microplate assays, hematology controls, and clinical chemistry analyzers.",
    iconName: "clinical",
    workflows: [
      "ELISA Assays",
      "Serum & Plasma Handling",
      "Clinical Chemistry Prep",
      "Microplate Inoculation",
    ],
    recommendedInstruments: [
      "8 & 12-Channel Pipettes",
      "Autoclavable Micropipettes",
      "Universal Pipette Tips",
    ],
  },
  {
    id: "pharmaceutical-research",
    slug: "pharmaceutical-research",
    title: "Pharmaceutical Research",
    tag: "APPLICATION",
    description:
      "High-precision electronic and mechanical dispensing systems optimized for drug discovery screening, formulation chemistry, active pharmaceutical ingredient (API) compounding, and sterile batch testing.",
    iconName: "pharma",
    workflows: [
      "Drug Discovery Screening",
      "Sterile Compounding",
      "Serial Dilutions",
      "Viscous Buffer Dispensing",
    ],
    recommendedInstruments: [
      "Electronic Motorized Pipettes",
      "Bottle Top Dispensers",
      "Positive Displacement Pipettes",
    ],
  },
  {
    id: "food-beverage",
    slug: "food-beverage",
    title: "Food & Beverage Testing",
    tag: "APPLICATION",
    description:
      "Rugged chemical-resistant dispensers and heavy-duty micropipettes engineered for quality control, bacterial pathogen detection, nutritional testing, food safety validation, and fermentation monitoring.",
    iconName: "food",
    workflows: [
      "Food Pathogen Detection",
      "Fermentation Monitoring",
      "Moisture & Fat Analysis",
      "Aflatoxin Testing",
    ],
    recommendedInstruments: [
      "Heavy-Duty Pipettes",
      "Bottle Top Dispensers",
      "Macro-Volume Pipettes (1–10 mL)",
    ],
  },
  {
    id: "environmental-testing",
    slug: "environmental-testing",
    title: "Environmental Testing",
    tag: "APPLICATION",
    description:
      "Durable fluid transfer instruments built to withstand harsh sample matrices during municipal water testing, wastewater monitoring, heavy metal trace extraction, soil analysis, and environmental air filtration assays.",
    iconName: "environmental",
    workflows: [
      "Wastewater Quality Testing",
      "Trace Metal Extraction",
      "Soil Core Leaching",
      "Acid Digestion Dosing",
    ],
    recommendedInstruments: [
      "Corrosion-Proof Dispensers",
      "Variable Volume 100–1000 µL",
      "Macro Pipettes",
    ],
  },
  {
    id: "academic-research",
    slug: "academic-research",
    title: "Academic & Research Labs",
    tag: "APPLICATION",
    description:
      "Ergonomic, cost-effective, and fully autoclavable starter sets designed for university research centers, undergraduate biochemistry education, laboratory technician training, and interdisciplinary scientific studies.",
    iconName: "academic",
    workflows: [
      "Biochemistry Laboratory Practicals",
      "Undergraduate Student Training",
      "General Reagent Transfer",
      "Buffer Titration Preparation",
    ],
    recommendedInstruments: [
      "3-Pipette Starter Packs",
      "Carousel Stands",
      "Fixed Volume Micropipettes",
    ],
  },
];
