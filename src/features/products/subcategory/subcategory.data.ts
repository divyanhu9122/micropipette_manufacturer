export interface SubcategoryProduct {
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

export interface SubcategoryConfig {
  id: string;
  slug: string;
  title: string;
  tag: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  products: readonly SubcategoryProduct[];
}

export type SortValue = "featured" | "name-asc" | "name-desc";

// 1. Variable Volume Products
const variableVolumeProducts: readonly SubcategoryProduct[] = [
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
];

// 2. Fixed Volume Products
const fixedVolumeProducts: readonly SubcategoryProduct[] = [
  {
    id: "fv-prod-1",
    slug: "ssciences-ecofix-fixed-volume-5",
    brandLabel: "SSCIENCES",
    typeLabel: "FIXED VOLUME",
    title: "SSCIENCES EcoFix Fixed Volume Micropipette (5 µL)",
    description:
      "Dedicated single-volume pipette for routine diagnostic testing, eliminating dial setting errors with factory-locked calibration.",
    specs: {
      volumeRange: "5 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Assembly",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "fv-prod-2",
    slug: "ssciences-ecofix-fixed-volume-10",
    brandLabel: "SSCIENCES",
    typeLabel: "FIXED VOLUME",
    title: "SSCIENCES EcoFix Fixed Volume Micropipette (10 µL)",
    description:
      "Reliable single-volume micropipette designed for blood banking, clinical assays, and high-frequency fixed-volume transfers.",
    specs: {
      volumeRange: "10 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Assembly",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "fv-prod-3",
    slug: "labxe-standard-fix-volume-20",
    brandLabel: "LABXE",
    typeLabel: "FIXED VOLUME",
    title: "LABXE Standard-Fix Single Volume Micropipette (20 µL)",
    description:
      "Engineered with chemical-resistant polymers and thermal shielding for highly consistent repetitive pipetting.",
    specs: {
      volumeRange: "20 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "LABXE",
  },
  {
    id: "fv-prod-4",
    slug: "labxe-standard-fix-volume-50",
    brandLabel: "LABXE",
    typeLabel: "FIXED VOLUME",
    title: "LABXE Standard-Fix Single Volume Micropipette (50 µL)",
    description:
      "Calibrated to ISO 8655 standards with stainless steel internal piston and smooth thumb stroke mechanism.",
    specs: {
      volumeRange: "50 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "LABXE",
  },
  {
    id: "fv-prod-5",
    slug: "ssciences-fac-fix-fully-autoclavable-100",
    brandLabel: "SSCIENCES",
    typeLabel: "FIXED VOLUME",
    title: "SSCIENCES FAC-Fix Fully Autoclavable Micropipette (100 µL)",
    description:
      "Entirely autoclavable at 121°C without disassembly, ideal for microbiology, cell culture, and sterile protocols.",
    specs: {
      volumeRange: "100 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "121°C Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "fv-prod-6",
    slug: "danwer-precision-calibrated-fixed-200",
    brandLabel: "DANWER",
    typeLabel: "FIXED VOLUME",
    title: "DANWER Precision Calibrated Fixed Volume Pipette (200 µL)",
    description:
      "Ultra-low plunger resistance and shock-absorbing tip ejector for continuous diagnostic batch processing.",
    specs: {
      volumeRange: "200 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Autoclavable Tip Cone",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "DANWER",
  },
  {
    id: "fv-prod-7",
    slug: "labxe-standard-fix-volume-500",
    brandLabel: "LABXE",
    typeLabel: "FIXED VOLUME",
    title: "LABXE Standard-Fix Single Volume Micropipette (500 µL)",
    description:
      "Rugged polymer construction with high chemical resistance against aggressive reagents, acids, and alkalis.",
    specs: {
      volumeRange: "500 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "LABXE",
  },
  {
    id: "fv-prod-8",
    slug: "ssciences-fac-fix-fully-autoclavable-1000",
    brandLabel: "SSCIENCES",
    typeLabel: "FIXED VOLUME",
    title: "SSCIENCES FAC-Fix Fully Autoclavable Micropipette (1000 µL)",
    description:
      "High-volume single fixed pipette providing superior accuracy, repeatability, and steam sterilization integrity.",
    specs: {
      volumeRange: "1000 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "121°C Fully Autoclavable",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
];

// 3. Single Channel Products
const singleChannelProducts: readonly SubcategoryProduct[] = [
  {
    id: "sc-prod-1",
    slug: "ssciences-science-plus-variable-05-10",
    brandLabel: "SSCIENCES",
    typeLabel: "SINGLE CHANNEL",
    title: "Science Plus Variable Volume Micropipette (0.5–10 µL)",
    description:
      "Precision single-channel variable volume pipette featuring ergonomic finger rest and click-stop volume dial.",
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
    id: "sc-prod-2",
    slug: "ssciences-science-plus-variable-10-100",
    brandLabel: "SSCIENCES",
    typeLabel: "SINGLE CHANNEL",
    title: "Science Plus Variable Volume Micropipette (10–100 µL)",
    description:
      "Engineered for high reproducibility, fatigue-free pipetting, and smooth single-tube dispensing.",
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
    id: "sc-prod-3",
    slug: "ssciences-fac-plus-fully-autoclavable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "SINGLE CHANNEL",
    title: "FAC Plus Fully Autoclavable Micropipette (20–200 µL)",
    description:
      "Complete steam sterilizability at 121°C without disassembly, providing advanced decontamination.",
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
    id: "sc-prod-4",
    slug: "labxe-precision-variable-100-1000",
    brandLabel: "LABXE",
    typeLabel: "SINGLE CHANNEL",
    title: "LABXE Precision Series Variable Volume (100–1000 µL)",
    description:
      "In-house molded polymer barrels, high chemical resistance, and integrated thermal insulation body.",
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
    id: "sc-prod-5",
    slug: "danwer-precision-electronic-variable-05-10",
    brandLabel: "DANWER",
    typeLabel: "SINGLE CHANNEL",
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
    id: "sc-prod-6",
    slug: "ssciences-ecofix-fixed-volume-10",
    brandLabel: "SSCIENCES",
    typeLabel: "SINGLE CHANNEL",
    title: "SSCIENCES EcoFix Fixed Volume Micropipette (10 µL)",
    description:
      "Reliable single-channel single-volume micropipette designed for blood banking and clinical assays.",
    specs: {
      volumeRange: "10 µL (Fixed)",
      increment: "Fixed",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Assembly",
    },
    channelType: "Single Channel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
];

// 4. Multichannel Products
const multichannelProducts: readonly SubcategoryProduct[] = [
  {
    id: "mc-prod-1",
    slug: "ssciences-multichannel-8ch-variable-05-10",
    brandLabel: "SSCIENCES",
    typeLabel: "MULTICHANNEL",
    title: "SSCIENCES 8-Channel Variable Micropipette (0.5–10 µL)",
    description:
      "Ultra-low volume 8-channel pipette for precise PCR mastermix loading and low-volume 96-well assays.",
    specs: {
      volumeRange: "0.5 – 10 µL",
      increment: "0.1 µL",
      channel: "8-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    channelType: "Multichannel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "mc-prod-2",
    slug: "ssciences-multichannel-8ch-variable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "MULTICHANNEL",
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
    id: "mc-prod-3",
    slug: "ssciences-multichannel-8ch-variable-50-300",
    brandLabel: "SSCIENCES",
    typeLabel: "MULTICHANNEL",
    title: "SSCIENCES 8-Channel Variable Micropipette (50–300 µL)",
    description:
      "Ideal for ELISA washing, cell culture media replenishment, and high-volume 96-well plate pipetting.",
    specs: {
      volumeRange: "50 – 300 µL",
      increment: "1.0 µL",
      channel: "8-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    channelType: "Multichannel",
    operation: "Mechanical",
    brand: "SSCIENCES",
  },
  {
    id: "mc-prod-4",
    slug: "labxe-multichannel-12ch-variable-10-100",
    brandLabel: "LABXE",
    typeLabel: "MULTICHANNEL",
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
    id: "mc-prod-5",
    slug: "labxe-multichannel-12ch-variable-30-300",
    brandLabel: "LABXE",
    typeLabel: "MULTICHANNEL",
    title: "LABXE 12-Channel Variable Volume Micropipette (30–300 µL)",
    description:
      "Designed for maximum laboratory throughput with compound lever action for effortless tip ejection across 12 channels.",
    specs: {
      volumeRange: "30 – 300 µL",
      increment: "1.0 µL",
      channel: "12-Channel",
      autoclavable: "Autoclavable Lower Part",
    },
    channelType: "Multichannel",
    operation: "Mechanical",
    brand: "LABXE",
  },
  {
    id: "mc-prod-6",
    slug: "danwer-electronic-8ch-precision-5-100",
    brandLabel: "DANWER",
    typeLabel: "MULTICHANNEL",
    title: "DANWER Electronic 8-Channel Precision Pipette (5–100 µL)",
    description:
      "Microprocessor-driven motorized multi-dispense mode with multi-speed aspiration and automated tip ejection.",
    specs: {
      volumeRange: "5 – 100 µL",
      increment: "0.1 µL",
      channel: "8-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    channelType: "Multichannel",
    operation: "Electronic",
    brand: "DANWER",
  },
];

// 5. Electronic Products
const electronicProducts: readonly SubcategoryProduct[] = [
  {
    id: "el-prod-1",
    slug: "danwer-precision-electronic-variable-05-10",
    brandLabel: "DANWER",
    typeLabel: "ELECTRONIC",
    title: "DANWER Electronic Variable Controller Micropipette (0.5–10 µL)",
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
    id: "el-prod-2",
    slug: "danwer-precision-electronic-variable-10-200",
    brandLabel: "DANWER",
    typeLabel: "ELECTRONIC",
    title: "DANWER Electronic Variable Micropipette (10–200 µL)",
    description:
      "Programmable pipetting modes including reverse, multi-dispense, dilution, and mixing with rechargeable Li-ion battery.",
    specs: {
      volumeRange: "10 – 200 µL",
      increment: "0.1 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Tip Cone",
    },
    channelType: "Single Channel",
    operation: "Electronic",
    brand: "DANWER",
  },
  {
    id: "el-prod-3",
    slug: "danwer-precision-electronic-variable-100-1000",
    brandLabel: "DANWER",
    typeLabel: "ELECTRONIC",
    title: "DANWER Electronic Variable Micropipette (100–1000 µL)",
    description:
      "High-volume motorized pipette offering zero user-induced pipetting fatigue, digital calibration, and memory recall.",
    specs: {
      volumeRange: "100 – 1000 µL",
      increment: "1.0 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Tip Cone",
    },
    channelType: "Single Channel",
    operation: "Electronic",
    brand: "DANWER",
  },
  {
    id: "el-prod-4",
    slug: "danwer-electronic-8ch-precision-5-100",
    brandLabel: "DANWER",
    typeLabel: "ELECTRONIC",
    title: "DANWER Electronic 8-Channel Precision Pipette (5–100 µL)",
    description:
      "Microprocessor-driven motorized multi-dispense mode with multi-speed aspiration and automated tip ejection.",
    specs: {
      volumeRange: "5 – 100 µL",
      increment: "0.1 µL",
      channel: "8-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    channelType: "Multichannel",
    operation: "Electronic",
    brand: "DANWER",
  },
  {
    id: "el-prod-5",
    slug: "danwer-electronic-12ch-precision-10-200",
    brandLabel: "DANWER",
    typeLabel: "ELECTRONIC",
    title: "DANWER Electronic 12-Channel High-Throughput Pipette (10–200 µL)",
    description:
      "Motorized 12-channel pipette for 96-well microplate workflows, featuring multi-dispensing and programmable aliquot series.",
    specs: {
      volumeRange: "10 – 200 µL",
      increment: "0.1 µL",
      channel: "12-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    channelType: "Multichannel",
    operation: "Electronic",
    brand: "DANWER",
  },
  {
    id: "el-prod-6",
    slug: "ssciences-motorix-electronic-pipette-controller",
    brandLabel: "SSCIENCES",
    typeLabel: "ELECTRONIC",
    title: "SSCIENCES MotoriX Electronic Pipetting Controller",
    description:
      "Ergonomic cordless serological controller with dual-speed gravity and blow-out dispensing for 0.1 to 100 mL pipettes.",
    specs: {
      volumeRange: "0.1 – 100 mL",
      increment: "Continuous",
      channel: "Single Channel",
      autoclavable: "Autoclavable Nosecone & Filter",
    },
    channelType: "Single Channel",
    operation: "Electronic",
    brand: "SSCIENCES",
  },
];

// 6. Mechanical Products
const mechanicalProducts: readonly SubcategoryProduct[] = [
  {
    id: "mech-prod-1",
    slug: "ssciences-science-plus-variable-05-10",
    brandLabel: "SSCIENCES",
    typeLabel: "MECHANICAL",
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
    id: "mech-prod-2",
    slug: "ssciences-science-plus-variable-10-100",
    brandLabel: "SSCIENCES",
    typeLabel: "MECHANICAL",
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
    id: "mech-prod-3",
    slug: "ssciences-fac-plus-fully-autoclavable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "MECHANICAL",
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
    id: "mech-prod-4",
    slug: "labxe-precision-variable-100-1000",
    brandLabel: "LABXE",
    typeLabel: "MECHANICAL",
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
    id: "mech-prod-5",
    slug: "ssciences-multichannel-8ch-variable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "MECHANICAL",
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
    id: "mech-prod-6",
    slug: "labxe-multichannel-12ch-variable-10-100",
    brandLabel: "LABXE",
    typeLabel: "MECHANICAL",
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
];

// Configuration for all 6 subcategories
export const subcategoryConfigs: Record<string, SubcategoryConfig> = {
  "variable-volume": {
    id: "variable-volume",
    slug: "variable-volume",
    title: "Variable Volume Micropipettes",
    tag: "Micropipettes",
    heroDescription:
      "Precision variable volume micropipettes engineered for flexible volume adjustments, ergonomic pipetting comfort, and ISO 8655 gravimetric compliance across research and clinical laboratories.",
    metaTitle: "Variable Volume Micropipettes | MicropipetteManufacturer.in",
    metaDescription:
      "Explore precision variable volume micropipettes from LABXE, SSCIENCES, and DANWER. Browse single channel, multichannel, mechanical, and electronic options with volume ranges from 0.1 µL to 10 mL.",
    canonicalUrl:
      "https://micropipettemanufacturer.in/products/micropipettes/variable-volume",
    products: variableVolumeProducts,
  },
  "fixed-volume": {
    id: "fixed-volume",
    slug: "fixed-volume",
    title: "Fixed Volume Micropipettes",
    tag: "Micropipettes",
    heroDescription:
      "Dedicated single-volume micropipettes designed for repetitive testing protocols, routine clinical diagnostics, and high-throughput workflows where volume lock and error prevention are critical.",
    metaTitle: "Fixed Volume Micropipettes | MicropipetteManufacturer.in",
    metaDescription:
      "Explore dedicated fixed volume micropipettes from LABXE, SSCIENCES, and DANWER. Calibrated single-volume pipettes from 5 µL to 1000 µL for consistent, error-free dispensing.",
    canonicalUrl:
      "https://micropipettemanufacturer.in/products/micropipettes/fixed-volume",
    products: fixedVolumeProducts,
  },
  "single-channel": {
    id: "single-channel",
    slug: "single-channel",
    title: "Single Channel Micropipettes",
    tag: "Channel Type",
    heroDescription:
      "High-accuracy single-channel pipettes for tubes, vials, and standard laboratory vessels. Engineered with thermal insulation bodies, low plunger resistance, and autoclave compatibility.",
    metaTitle: "Single Channel Micropipettes | MicropipetteManufacturer.in",
    metaDescription:
      "Browse precision single channel micropipettes from LABXE, SSCIENCES, and DANWER. Available in manual and electronic models from 0.1 µL to 10 mL.",
    canonicalUrl:
      "https://micropipettemanufacturer.in/products/micropipettes/single-channel",
    products: singleChannelProducts,
  },
  "multichannel": {
    id: "multichannel",
    slug: "multichannel",
    title: "Multichannel Micropipettes",
    tag: "Channel Type",
    heroDescription:
      "8-channel and 12-channel micropipettes optimized for 96-well and 384-well microplate applications, ELISA assays, PCR mastermix distribution, and high-throughput liquid handling.",
    metaTitle: "Multichannel Micropipettes (8 & 12 Channel) | MicropipetteManufacturer.in",
    metaDescription:
      "Explore 8-channel and 12-channel micropipettes from LABXE, SSCIENCES, and DANWER. Engineered for 96-well plates with rotating manifolds and low-force tip ejection.",
    canonicalUrl:
      "https://micropipettemanufacturer.in/products/micropipettes/multichannel",
    products: multichannelProducts,
  },
  "electronic": {
    id: "electronic",
    slug: "electronic",
    title: "Electronic Micropipettes",
    tag: "Operation",
    heroDescription:
      "Microprocessor-controlled motorized micropipettes providing automated multidispensing, programmable pipetting modes, electronic tip ejection, and zero thumb-strain operation.",
    metaTitle: "Electronic Micropipettes & Controllers | MicropipetteManufacturer.in",
    metaDescription:
      "Discover motorized electronic micropipettes and pipette controllers from DANWER and SSCIENCES. Programmable multidispensing, digital calibration, and rechargeable power.",
    canonicalUrl:
      "https://micropipettemanufacturer.in/products/micropipettes/electronic",
    products: electronicProducts,
  },
  "mechanical": {
    id: "mechanical",
    slug: "mechanical",
    title: "Mechanical Micropipettes",
    tag: "Operation",
    heroDescription:
      "Rugged, dependable manual micropipettes built with chemical-resistant polymers, click-stop volume locks, thermal shielding, and steam-autoclavable assemblies for routine laboratory work.",
    metaTitle: "Mechanical Micropipettes | MicropipetteManufacturer.in",
    metaDescription:
      "Browse manual mechanical micropipettes from LABXE, SSCIENCES, and DANWER. Autoclavable, ergonomic, and ISO 8655 calibrated for long-lasting laboratory durability.",
    canonicalUrl:
      "https://micropipettemanufacturer.in/products/micropipettes/mechanical",
    products: mechanicalProducts,
  },
};

export function getSubcategoryBySlug(slug: string): SubcategoryConfig | undefined {
  return subcategoryConfigs[slug];
}

export function getAllSubcategorySlugs(): string[] {
  return Object.keys(subcategoryConfigs);
}
