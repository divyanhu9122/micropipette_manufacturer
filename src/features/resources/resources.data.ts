export interface ResourceItem {
  id: string;
  title: string;
  category: "catalogue" | "datasheet" | "manual" | "quality" | "guide";
  brand: "all" | "labxe" | "ssciences" | "danwer";
  format: "PDF" | "XLSX" | "DOCX";
  fileSize: string;
  description: string;
  isFeatured?: boolean;
}

export const RESOURCE_CATEGORIES = [
  { id: "all", label: "All Documents" },
  { id: "catalogue", label: "Product Catalogues" },
  { id: "datasheet", label: "Technical Datasheets" },
  { id: "manual", label: "User Manuals & Protocols" },
  { id: "quality", label: "Quality & ISO Certificates" },
  { id: "guide", label: "Chemical Guides & Notes" },
] as const;

export const RESOURCE_BRANDS = [
  { id: "all", label: "All Brands" },
  { id: "labxe", label: "LABXE" },
  { id: "ssciences", label: "SSCIENCES" },
  { id: "danwer", label: "DANWER" },
] as const;

export const RESOURCES_DATA: ResourceItem[] = [
  {
    id: "res-01",
    title: "LABXE Complete Precision Liquid Handling Catalogue (2026 Edition)",
    category: "catalogue",
    brand: "labxe",
    format: "PDF",
    fileSize: "6.2 MB",
    description:
      "Comprehensive catalog of LABXE variable volume, multichannel, and clinical micropipettes with volumetric tolerance specifications.",
    isFeatured: true,
  },
  {
    id: "res-02",
    title: "SSCIENCES Master Laboratory Pipettes & Bottle Top Dispensers Catalogue",
    category: "catalogue",
    brand: "ssciences",
    format: "PDF",
    fileSize: "5.4 MB",
    description:
      "Full product line specifications for Science Plus semi-autoclavable and FAC Plus fully autoclavable liquid handling instruments.",
    isFeatured: true,
  },
  {
    id: "res-03",
    title: "DANWER Industrial Analytical Micro-Weighing & Electronic Pipetting Catalogue",
    category: "catalogue",
    brand: "danwer",
    format: "PDF",
    fileSize: "5.0 MB",
    description:
      "Complete portfolio of motorized digital pipettes, electromagnetic analytical balances, and heavy-duty dispensers.",
    isFeatured: true,
  },
  {
    id: "res-04",
    title: "OEM & Private Label Manufacturing Capabilities & Technical Specifications Guide",
    category: "catalogue",
    brand: "all",
    format: "PDF",
    fileSize: "3.8 MB",
    description:
      "Detailed guide to in-house injection tooling, laser marking, customized packaging, and volume production thresholds.",
    isFeatured: true,
  },
  {
    id: "res-05",
    title: "LABXE Precision Series Single-Channel Variable Micropipettes Datasheet",
    category: "datasheet",
    brand: "labxe",
    format: "PDF",
    fileSize: "1.9 MB",
    description:
      "In-depth mechanical drawings, material specifications (PVDF, stainless steel), and gravimetric systematic/random error tolerances.",
  },
  {
    id: "res-06",
    title: "SSCIENCES FAC Plus Fully Autoclavable Series Technical Datasheet",
    category: "datasheet",
    brand: "ssciences",
    format: "PDF",
    fileSize: "2.1 MB",
    description:
      "Sterilization parameters, dimensional footprint, piston stroke ergonomics, and tip ejector compatibility.",
  },
  {
    id: "res-07",
    title: "DANWER Digital Motorized Stepper Electronic Pipette Technical Datasheet",
    category: "datasheet",
    brand: "danwer",
    format: "PDF",
    fileSize: "2.8 MB",
    description:
      "Battery life, OLED menu structure, stepper motor dispensing accuracy curves, and USB-C digital interface specs.",
  },
  {
    id: "res-08",
    title: "High-Density 8-Channel & 12-Channel Micropipette Manifold Datasheet",
    category: "datasheet",
    brand: "all",
    format: "PDF",
    fileSize: "2.4 MB",
    description:
      "360° rotating head mechanism, individual nozzle seal specifications, and microplate well alignment tolerances.",
  },
  {
    id: "res-09",
    title: "Universal Pipette Tip Compatibility & Sealing Geometry Matrix",
    category: "datasheet",
    brand: "all",
    format: "PDF",
    fileSize: "1.3 MB",
    description:
      "Cross-brand universal tip fit matrix for standard, filtered, low-retention, and extended-length pipette tips.",
  },
  {
    id: "res-10",
    title: "ISO 8655 Gravimetric Calibration, Verification & Maintenance Protocol",
    category: "manual",
    brand: "all",
    format: "PDF",
    fileSize: "3.2 MB",
    description:
      "Step-by-step 10-measurement gravimetric test protocol using 6-decimal analytical balance, temperature, and Z-factor corrections.",
    isFeatured: true,
  },
  {
    id: "res-11",
    title: "Steam Sterilization & Autoclaving Protocol Guide (121°C / 20 min)",
    category: "manual",
    brand: "ssciences",
    format: "PDF",
    fileSize: "1.4 MB",
    description:
      "Decontamination protocols, autoclaving instructions without disassembly, and post-autoclave cool-down stabilization procedures.",
  },
  {
    id: "res-12",
    title: "Electronic Pipette Firmware, Motor Calibration & Service Manual",
    category: "manual",
    brand: "danwer",
    format: "PDF",
    fileSize: "4.1 MB",
    description:
      "Routine operator maintenance, piston lubrication, electronic recalibration offsets, and error code troubleshooting.",
  },
  {
    id: "res-13",
    title: "Bottle-Top Dispenser Priming, Reagent Recirculation & Cleaning Guide",
    category: "manual",
    brand: "ssciences",
    format: "PDF",
    fileSize: "1.8 MB",
    description:
      "Safe valve operation, purging air bubbles, chemical flushing steps, and borosilicate cylinder seal maintenance.",
  },
  {
    id: "res-14",
    title: "ISO 9001:2015 Quality Management System Certification Overview",
    category: "quality",
    brand: "all",
    format: "PDF",
    fileSize: "850 KB",
    description:
      "Quality assurance framework documentation covering raw material inspection, lot traceability, and manufacturing process controls.",
  },
  {
    id: "res-15",
    title: "ISO 13485:2016 Medical Devices Quality Management Standards Summary",
    category: "quality",
    brand: "all",
    format: "PDF",
    fileSize: "920 KB",
    description:
      "Regulatory compliance overview for diagnostic, clinical, and healthcare laboratory instrumentation manufacturing.",
  },
  {
    id: "res-16",
    title: "CE Declaration of Conformity & Electromagnetic Compatibility (EMC) Summary",
    category: "quality",
    brand: "danwer",
    format: "PDF",
    fileSize: "760 KB",
    description:
      "European Conformity documentation for motorized laboratory pipettes and digital analytical balancing equipment.",
  },
  {
    id: "res-17",
    title: "Accredited Calibration Certificate Sample & Multi-Point Test Report",
    category: "quality",
    brand: "labxe",
    format: "PDF",
    fileSize: "1.1 MB",
    description:
      "Sample individual certificate of calibration supplied with serial-numbered instruments showing systematic and random errors.",
  },
  {
    id: "res-18",
    title: "Comprehensive Chemical Compatibility & Reagent Resistance Chart",
    category: "guide",
    brand: "all",
    format: "PDF",
    fileSize: "2.5 MB",
    description:
      "Solvent and acid resistance rating table for PVDF, PTFE, borosilicate glass, stainless steel, and fluoropolymer components.",
    isFeatured: true,
  },
  {
    id: "res-19",
    title: "Forward vs. Reverse Pipetting Techniques for Viscous & Volatile Liquids",
    category: "guide",
    brand: "all",
    format: "PDF",
    fileSize: "1.6 MB",
    description:
      "Standard operating technique guide for handling glycerol, organic solvents, biological serums, and foaming reagents.",
  },
];
