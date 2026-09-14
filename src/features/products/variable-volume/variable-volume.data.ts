// Source of truth: "MicropipetteManufacturer_Phase3_Variable_Volume_Subcategory_Fresh_v8(1).html"
// Technical specifications and product descriptions follow project claim discipline.
// Neutral placeholders [VERIFY] are preserved where exact specifications await verified business data.

export interface VariableVolumeProduct {
  id: string;
  slug: string;
  brandLabel: "SSCIENCES" | "LABXE" | "DANWER";
  typeLabel: string;
  title: string;
  description: string;
  specs: {
    volumeRange: string;
    increment: string;
    channel: string;
    autoclavable: string;
  };
  channelType: "Single Channel" | "Multichannel";
  operation: "Mechanical" | "Electronic";
  brand: "SSCIENCES" | "LABXE" | "DANWER";
}

export type SortValue = "featured" | "name-asc" | "name-desc";

export const initialVariableVolumeProducts: readonly VariableVolumeProduct[] = [
  {
    id: "vv-prod-1",
    slug: "ssciences-science-plus-variable-05-10",
    brandLabel: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    title: "Science Plus Variable Volume Micropipette (0.5–10 µL)",
    description:
      "Semi-autoclavable ergonomic pipette with click-stop volume adjustment and streamlined two-step plunger stroke.",
    specs: {
      volumeRange: "0.5 – 10 µL",
      increment: "0.1 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Part",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "vv-prod-2",
    slug: "ssciences-science-plus-variable-10-100",
    brandLabel: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    title: "Science Plus Variable Volume Micropipette (10–100 µL)",
    description:
      "Lightweight mechanical pipette engineered for high reproducibility, fatigue-free pipetting, and smooth calibration.",
    specs: {
      volumeRange: "10 – 100 µL",
      increment: "1.0 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Part",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "vv-prod-3",
    slug: "ssciences-fac-plus-fully-autoclavable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    title: "FAC Plus Fully Autoclavable Micropipette (20–200 µL)",
    description:
      "Complete steam sterilizability at 121°C without disassembly, providing advanced decontamination for sensitive assays.",
    specs: {
      volumeRange: "20 – 200 µL",
      increment: "1.0 µL",
      channel: "Single Channel",
      autoclavable: "121°C Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "vv-prod-4",
    slug: "labxe-precision-variable-100-1000",
    brandLabel: "LABXE",
    typeLabel: "VARIABLE VOLUME",
    title: "LABXE Precision Series Variable Volume (100–1000 µL)",
    description:
      "Designed with in-house molded polymer barrels, high chemical resistance, and an integrated thermal insulation body.",
    specs: {
      volumeRange: "100 – 1000 µL",
      increment: "5.0 µL",
      channel: "Single Channel",
      autoclavable: "Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "LABXE",
  },
  {
    id: "vv-prod-5",
    slug: "ssciences-multichannel-8ch-variable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    title: "SSCIENCES 8-Channel Variable Micropipette (20–200 µL)",
    description:
      "Optimized 360° rotating manifold with individual piston/tip cone assemblies for microplate liquid handling.",
    specs: {
      volumeRange: "20 – 200 µL",
      increment: "1.0 µL",
      channel: "8-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    channelType: "Multichannel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "vv-prod-6",
    slug: "danwer-precision-electronic-variable-05-10",
    brandLabel: "DANWER",
    typeLabel: "VARIABLE VOLUME",
    title: "DANWER Electronic Variable Controller Micropipette",
    description:
      "Microprocessor-controlled stepper motor delivering motorized aspiration, multidispensing, and digital accuracy.",
    specs: {
      volumeRange: "0.5 – 10 µL",
      increment: "0.01 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Tip Cone",
    },
    channelType: "Single Channel",
    operation: "Electronic",
    brand: "DANWER",
  },
  {
    id: "vv-prod-7",
    slug: "labxe-multichannel-12ch-variable-10-100",
    brandLabel: "LABXE",
    typeLabel: "VARIABLE VOLUME",
    title: "LABXE 12-Channel Variable Volume Micropipette (10–100 µL)",
    description:
      "High-throughput 96-well plate multichannel pipette with low plunger force and individual tip sealing rings.",
    specs: {
      volumeRange: "10 – 100 µL",
      increment: "1.0 µL",
      channel: "12-Channel",
      autoclavable: "Autoclavable Lower Part",
    },
    channelType: "Multichannel",
    operation: "Mechanical",
    brand: "LABXE",
  },
  {
    id: "vv-prod-8",
    slug: "ssciences-science-plus-macro-1-10ml",
    brandLabel: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    title: "Science Plus Macro Variable Volume (1–10 mL)",
    description:
      "High-capacity macro micropipette equipped with nozzle filter protection for viscous liquids and bulk pipetting.",
    specs: {
      volumeRange: "1 – 10 mL",
      increment: "0.1 mL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Part",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
];

export const channelOptions = [
  { id: "all", label: "All" },
  { id: "single", label: "Single Channel" },
  { id: "multi", label: "Multichannel" },
] as const;

export const operationOptions = [
  { id: "mechanical", label: "Mechanical" },
  { id: "electronic", label: "Electronic" },
] as const;

export const volumeRangeOptions = [
  { id: "0.1-2.5", label: "0.1 – 2.5 µL" },
  { id: "0.5-10", label: "0.5 – 10 µL" },
  { id: "2-20", label: "2 – 20 µL" },
  { id: "10-100", label: "10 – 100 µL" },
  { id: "20-200", label: "20 – 200 µL" },
  { id: "100-1000", label: "100 – 1000 µL" },
  { id: "1-10ml", label: "1 – 10 mL" },
] as const;

export const brandOptions = [
  { id: "LABXE", label: "LABXE" },
  { id: "SSCIENCES", label: "SSCIENCES" },
  { id: "DANWER", label: "DANWER" },
] as const;
