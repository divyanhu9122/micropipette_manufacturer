// Source of truth: organized file/02-public-prototypes/
// MicropipetteManufacturer_Phase3_Product_Listing_Refined_v17_Sort_Above_Results.html
// Unified product data with verified catalog items across categories and brands.

export type ProductFamily =
  | "Micropipette"
  | "Bottle Top Dispenser"
  | "Pipette Controller"
  | "Lab Plasticware"
  | "Lab Balances"
  | "Laboratory Instruments";

export type ProductBrand =
  | "LABXE"
  | "SSCIENCES"
  | "DANWER"
  | "dr.pipette"
  | "sscientific";

export type SortValue = "featured" | "az" | "za";

export interface SortOption {
  value: SortValue;
  label: string;
}

export interface ProductListItem {
  id: string;
  slug: string;
  brandLabel: ProductBrand;
  typeLabel: string;
  title: string;
  description: string;
  specs: readonly string[];
  family: ProductFamily;
  subtype?: string;
  channelType?: "Single Channel" | "Multichannel";
  volumeRange?: string;
}

export const productFamilies: readonly ProductFamily[] = [
  "Micropipette",
  "Bottle Top Dispenser",
  "Pipette Controller",
  "Lab Plasticware",
  "Lab Balances",
  "Laboratory Instruments",
];

export const productBrands: readonly ProductBrand[] = [
  "LABXE",
  "SSCIENCES",
  "DANWER",
  "dr.pipette",
  "sscientific",
];

export const productFamilyRoutes: Partial<Record<ProductFamily, string>> = {
  Micropipette: "/products/micropipettes",
};

export const sortOptions: readonly SortOption[] = [
  { value: "featured", label: "Sort: Featured" },
  { value: "az", label: "Name A→Z" },
  { value: "za", label: "Name Z→A" },
];

export const productListItems: readonly ProductListItem[] = [
  {
    id: "ssciences-science-plus-variable-05-10",
    slug: "ssciences-science-plus-variable-05-10",
    brandLabel: "SSCIENCES",
    typeLabel: "Variable Volume",
    title: "Science Plus Variable Volume Micropipette (0.5–10 µL)",
    description:
      "Precision single-channel variable volume pipette featuring ergonomic finger rest, smooth click-stop volume adjustment, and separate tip ejector.",
    specs: ["0.5 – 10 µL", "Single Channel", "Autoclavable Lower Assembly"],
    family: "Micropipette",
    channelType: "Single Channel",
    volumeRange: "0.5–10 µL",
  },
  {
    id: "ssciences-science-plus-variable-10-100",
    slug: "ssciences-science-plus-variable-10-100",
    brandLabel: "SSCIENCES",
    typeLabel: "Variable Volume",
    title: "Science Plus Variable Volume Micropipette (10–100 µL)",
    description:
      "Reliable mid-volume mechanical pipette engineered for high reproducibility, fatigue-free handling, and broad chemical compatibility.",
    specs: ["10 – 100 µL", "Single Channel", "Autoclavable Lower Assembly"],
    family: "Micropipette",
    channelType: "Single Channel",
    volumeRange: "10–100 µL",
  },
  {
    id: "ssciences-fac-plus-fully-autoclavable-20-200",
    slug: "ssciences-fac-plus-fully-autoclavable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "Variable Volume",
    title: "FAC Plus Fully Autoclavable Micropipette (20–200 µL)",
    description:
      "Fully autoclavable mechanical pipette designed for critical contamination control. Steam sterilizable at 121°C without disassembly.",
    specs: ["20 – 200 µL", "Single Channel", "121°C Fully Autoclavable"],
    family: "Micropipette",
    channelType: "Single Channel",
    volumeRange: "20–200 µL",
  },
  {
    id: "labxe-precision-variable-100-1000",
    slug: "labxe-precision-variable-100-1000",
    brandLabel: "LABXE",
    typeLabel: "Variable Volume",
    title: "LABXE Precision Series Variable Volume (100–1000 µL)",
    description:
      "Heavy-duty milliliter-class variable pipette crafted from in-house precision injection molds with high chemical resistance.",
    specs: ["100 – 1000 µL", "Single Channel", "Autoclavable"],
    family: "Micropipette",
    channelType: "Single Channel",
    volumeRange: "100–1000 µL",
  },
  {
    id: "ssciences-multichannel-8ch-variable-20-200",
    slug: "ssciences-multichannel-8ch-variable-20-200",
    brandLabel: "SSCIENCES",
    typeLabel: "Multichannel",
    title: "SSCIENCES 8-Channel Variable Volume Micropipette (20–200 µL)",
    description:
      "Ergonomic 8-channel pipette equipped with a 360° rotating manifold, individual piston assemblies, and uniform tip sealing.",
    specs: ["20 – 200 µL", "8-Channel", "Autoclavable Manifold"],
    family: "Micropipette",
    channelType: "Multichannel",
    volumeRange: "20–200 µL",
  },
  {
    id: "danwer-electronic-single-05-10",
    slug: "danwer-electronic-single-05-10",
    brandLabel: "DANWER",
    typeLabel: "Electronic",
    title: "DANWER Electronic Single-Channel Pipette (0.5–10 µL)",
    description:
      "Microprocessor-driven motorized electronic pipette providing automatic aspiration, multidispensing, and zero-thumb strain.",
    specs: ["0.5 – 10 µL", "Single Channel", "Motorized Stepper"],
    family: "Micropipette",
    channelType: "Single Channel",
    volumeRange: "0.5–10 µL",
  },
  {
    id: "labxe-multichannel-12ch-variable-10-100",
    slug: "labxe-multichannel-12ch-variable-10-100",
    brandLabel: "LABXE",
    typeLabel: "Multichannel",
    title: "LABXE 12-Channel Variable Volume Micropipette (10–100 µL)",
    description:
      "12-channel high-density laboratory instrument designed for fast row-by-row pipetting in standard 96-well microplates.",
    specs: ["10 – 100 µL", "12-Channel", "Autoclavable Lower Section"],
    family: "Micropipette",
    channelType: "Multichannel",
    volumeRange: "10–100 µL",
  },
  {
    id: "ssciences-science-plus-macro-1-10ml",
    slug: "ssciences-science-plus-macro-1-10ml",
    brandLabel: "SSCIENCES",
    typeLabel: "Macro Volume",
    title: "Science Plus Macro Variable Volume (1–10 mL)",
    description:
      "High-capacity macro pipette designed for transferring large volumes with micropipette accuracy.",
    specs: ["1 – 10 mL", "Single Channel", "Integrated Aerosol Filter"],
    family: "Micropipette",
    channelType: "Single Channel",
    volumeRange: "1–10 mL",
  },
  {
    id: "universal-pipette-tips",
    slug: "universal-pipette-tips",
    brandLabel: "LABXE",
    typeLabel: "Pipette Tips",
    title: "Universal Pipette Tips",
    description:
      "High-quality compatible tips built for dependable fit, contamination control and consistent transfer accuracy.",
    specs: ["10 µL – 1250 µL", "Universal Fit"],
    family: "Lab Plasticware",
    subtype: "Pipette Tips",
    volumeRange: "10–1250 µL",
  },
  {
    id: "tip-box-rack-system",
    slug: "tip-box-rack-system",
    brandLabel: "LABXE",
    typeLabel: "Storage & Racks",
    title: "Tip Box & Rack System",
    description:
      "Structured storage solution for laboratory benches, designed for easy access and clean organization.",
    specs: ["96 Tips / Box", "Bench Friendly"],
    family: "Lab Plasticware",
    subtype: "Racks & Boxes",
  },
  {
    id: "pipette-controller",
    slug: "pipette-controller",
    brandLabel: "LABXE",
    typeLabel: "Pipette Controller",
    title: "Pipette Controller",
    description:
      "Compact controller built for comfortable operation and controlled aspiration/dispensing during routine use.",
    specs: ["Ergonomic Design", "Lightweight"],
    family: "Pipette Controller",
  },
  {
    id: "danwer-analytical-balance",
    slug: "danwer-analytical-balance",
    brandLabel: "DANWER",
    typeLabel: "Analytical Balance",
    title: "DANWER Analytical Balance",
    description:
      "Analytical weighing solution with stable performance for quality control, formulation and lab measurement tasks.",
    specs: ["0.0001 g", "Analytical"],
    family: "Lab Balances",
  },
];

export const prototypeTotalPages = Math.ceil(productListItems.length / 6);
