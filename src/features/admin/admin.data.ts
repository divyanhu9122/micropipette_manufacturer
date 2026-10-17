// Admin feature mock data and types
// Source: MicropipetteManufacturer_Phase4_Admin_CMS_Prototype_FINAL.html (Phase 4.1 & Phase 4.10)
// Status: Approved prototype data; will connect to Strapi/PostgreSQL in Stage 10.

export type EnquiryType =
  | "Product Quote"
  | "OEM / Private Label"
  | "Universal / General"
  | "Technical Resource"
  | "Bulk Requirement";

export type EnquiryStatus = "New" | "Open" | "Responded" | "Closed";

export interface EnquiryItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  type: EnquiryType;
  product: string;
  quantity: string;
  date: string;
  status: EnquiryStatus;
  message: string;
  oemDetails?: string;
  internalNotes?: string;
}

export interface KpiCard {
  id: string;
  label: string;
  icon: string;
  value: string;
  footerNote: string;
  badge: string;
}

export interface ProductActivityItem {
  id: string;
  product: string;
  action: string;
  editedBy: string;
  status: "Draft" | "Published";
  date: string;
}

export interface RecentContentItem {
  id: string;
  type: "Product" | "Blog" | "Resource" | "FAQ";
  title: string;
  subtitle: string;
  status: "Draft" | "Published" | "Uploaded";
}

export const ADMIN_KPIS: KpiCard[] = [
  {
    id: "total-products",
    label: "Total Products",
    icon: "P",
    value: "128",
    footerNote: "All content states",
    badge: "Sample",
  },
  {
    id: "draft-products",
    label: "Draft Products",
    icon: "D",
    value: "16",
    footerNote: "Editable, not live",
    badge: "Sample",
  },
  {
    id: "blog-articles",
    label: "Blog Articles",
    icon: "B",
    value: "18",
    footerNote: "Draft & published",
    badge: "Sample",
  },
  {
    id: "published-products",
    label: "Published Products",
    icon: "✓",
    value: "105",
    footerNote: "Shown as live",
    badge: "Sample",
  },
  {
    id: "new-enquiries",
    label: "New Enquiries",
    icon: "E",
    value: "12",
    footerNote: "Incoming messages",
    badge: "Sample",
  },
  {
    id: "resources-count",
    label: "Resources / Documents",
    icon: "R",
    value: "43",
    footerNote: "Central library",
    badge: "Sample",
  },
];

export const INITIAL_ENQUIRIES: EnquiryItem[] = [
  {
    id: "enq-001",
    name: "Aarav Mehta",
    company: "Northfield Labs",
    email: "aarav@example.test",
    phone: "+91 98200 12345",
    country: "India",
    type: "Product Quote",
    product: "Variable Volume Micropipette (100–1000 µL)",
    quantity: "25 units · sample",
    date: "01 Sep 2026 · 10:24",
    status: "New",
    message:
      "Requesting official manufacturer price quotation and calibration certificates for 25 units of variable volume single channel pipettes for hospital diagnostics laboratory expansion.",
  },
  {
    id: "enq-002",
    name: "Nadia Thomas",
    company: "Vertex Scientific",
    email: "nadia@example.test",
    phone: "+971 4 800 5678",
    country: "United Arab Emirates",
    type: "OEM / Private Label",
    product: "Multichannel Pipette Range (8 & 12 Channel)",
    quantity: "500 units per quarter",
    date: "31 Aug 2026 · 16:40",
    status: "Open",
    message:
      "We are an established Middle Eastern distributor looking for a long-term OEM manufacturing partnership for our private brand. Require customized housing colors, pad-printed logo, and bilingual user manuals.",
    oemDetails:
      "Branding: Custom pad print · Packaging: Private label box · Customization: Color-coded plunger rings & ISO 8655 factory calibration reports",
  },
  {
    id: "enq-003",
    name: "Rohan Kapoor",
    company: "Calibre Instruments",
    email: "rohan@example.test",
    phone: "+91 99112 34567",
    country: "India",
    type: "Technical Resource",
    product: "Bottle Top Dispenser",
    quantity: "5 units",
    date: "31 Aug 2026 · 14:15",
    status: "Responded",
    message:
      "Need technical chemical compatibility chart with concentrated hydrofluoric and fuming nitric acids for bottle top dispensers before issuing purchase tender.",
  },
  {
    id: "enq-004",
    name: "Mira Sen",
    company: "BioAxis Solutions",
    email: "mira@example.test",
    phone: "+65 6789 0123",
    country: "Singapore",
    type: "Bulk Requirement",
    product: "Filter Pipette Tips (Universal Fit)",
    quantity: "20,000 racks",
    date: "30 Aug 2026 · 11:05",
    status: "Open",
    message:
      "Inquiring about bulk container shipping lead times and palletization specs for low-retention aerosol barrier filter tips (10 µL and 200 µL).",
  },
  {
    id: "enq-005",
    name: "Daniel Cruz",
    company: "LabWorks Distribution",
    email: "daniel@example.test",
    phone: "+63 2 8123 4567",
    country: "Philippines",
    type: "Universal / General",
    product: "Mixed Product Requirement",
    quantity: "Mixed shipment container",
    date: "29 Aug 2026 · 12:15",
    status: "Closed",
    message:
      "General distribution inquiry for Southeast Asian educational institutions. Seeking full product catalogue, distributor price lists, and compliance documents for LABXE and SSCIENCES series.",
  },
];

export const RECENT_PRODUCT_ACTIVITIES: ProductActivityItem[] = [
  {
    id: "act-01",
    product: "Variable Volume Micropipette",
    action: "Specifications edited",
    editedBy: "Content Editor A",
    status: "Draft",
    date: "01 Sep 2026",
  },
  {
    id: "act-02",
    product: "Bottle Top Dispenser",
    action: "Resource linked",
    editedBy: "Content Editor B",
    status: "Draft",
    date: "31 Aug 2026",
  },
  {
    id: "act-03",
    product: "8-Channel Micropipette",
    action: "Content updated",
    editedBy: "Admin User",
    status: "Published",
    date: "31 Aug 2026",
  },
];

export const RECENT_CONTENT_ITEMS: RecentContentItem[] = [
  {
    id: "rc-01",
    type: "Product",
    title: "12-Channel Micropipette",
    subtitle: "Prototype item",
    status: "Draft",
  },
  {
    id: "rc-02",
    type: "Blog",
    title: "Choosing a Micropipette Range",
    subtitle: "Prototype item",
    status: "Published",
  },
  {
    id: "rc-03",
    type: "Resource",
    title: "Liquid Handling Catalogue",
    subtitle: "Prototype item",
    status: "Uploaded",
  },
  {
    id: "rc-04",
    type: "FAQ",
    title: "OEM branding availability",
    subtitle: "Prototype item",
    status: "Published",
  },
];

export interface AdminProductSpec {
  label: string;
  value: string;
}

export interface AdminProductItem {
  id: string;
  title: string;
  code: string;
  brand: "LABXE" | "SSCIENCES" | "DANWER";
  category: string;
  subcategory: string;
  channel?: string;
  slug: string;
  status: "Published" | "Draft";
  updatedDate: string;
  overview: string;
  features: string[];
  specs: AdminProductSpec[];
  displayOrder: number;
}

export const INITIAL_ADMIN_PRODUCTS: AdminProductItem[] = [
  {
    id: "prod-001",
    title: "LABXE Micropipette Single Channel",
    code: "LABXE-SP-001",
    brand: "LABXE",
    category: "Micropipettes",
    subcategory: "Variable Volume",
    channel: "Single Channel",
    slug: "labxe-precision-variable-100-1000",
    status: "Published",
    updatedDate: "01 Sep 2026",
    overview:
      "Precision variable volume single-channel micropipette engineered with click-stop volume adjustment, smooth plunger kinematics, and autoclavable lower tip cone.",
    features: [
      "Lightweight ergonomic construction minimizing thumb fatigue",
      "Thermal insulation preventing body heat transfer to internal piston",
      "ISO 8655 factory gravimetric calibration report included",
      "Chemical-resistant tip cone with universal tip fit",
    ],
    specs: [
      { label: "Volume Range", value: "100–1000 µL" },
      { label: "Increment", value: "1 µL" },
      { label: "Inaccuracy (A%)", value: "±0.6%" },
      { label: "Imprecision (CV%)", value: "≤0.2%" },
      {
        label: "Autoclavability",
        value: "Autoclavable lower assembly (121°C, 20 min)",
      },
      {
        label: "Tip Compatibility",
        value: "Universal 1000 µL filter & standard tips",
      },
      { label: "Piston Material", value: "Stainless steel / PVDF composite" },
    ],
    displayOrder: 10,
  },
  {
    id: "prod-002",
    title: "LABXE Micropipette Multi Channel",
    code: "LABXE-MC-008",
    brand: "LABXE",
    category: "Micropipettes",
    subcategory: "Multichannel",
    channel: "8-Channel",
    slug: "labxe-8-channel-variable-20-200",
    status: "Published",
    updatedDate: "31 Aug 2026",
    overview:
      "High-throughput 8-channel mechanical micropipette designed for 96-well microplate liquid handling, serial dilutions, and enzyme-linked immunosorbent assays.",
    features: [
      "360-degree rotatable manifold for optimal ergonomic pipetting posture",
      "Individual piston and tip cone assemblies for simple field servicing",
      "Compound tip cone design ensuring uniform tip seal across all 8 nozzles",
    ],
    specs: [
      { label: "Volume Range", value: "20–200 µL" },
      { label: "Increment", value: "0.2 µL" },
      { label: "Channels", value: "8 Channels" },
      { label: "Autoclavability", value: "Fully autoclavable manifold" },
    ],
    displayOrder: 20,
  },
  {
    id: "prod-003",
    title: "Universal Pipette Tips (Racked)",
    code: "SS-TIPS-0200",
    brand: "SSCIENCES",
    category: "Pipette Tips",
    subcategory: "Universal Fit",
    slug: "ssciences-universal-filter-tips-200",
    status: "Draft",
    updatedDate: "31 Aug 2026",
    overview:
      "Medical-grade virgin polypropylene pipette tips manufactured in certified ISO Class 8 cleanrooms. Certified DNase, RNase, and endotoxin free.",
    features: [
      "Ultra-low retention surface formulation maximizing sample recovery",
      "Hydrophobic polyethylene aerosol barrier preventing cross-contamination",
      "Autoclavable hinged racks compatible with multichannel pipettes",
    ],
    specs: [
      { label: "Volume Capacity", value: "200 µL" },
      { label: "Filter Type", value: "Pore size 10–20 µm hydrophobic PE" },
      { label: "Sterility", value: "Electron-beam irradiated (SAL 10⁻⁶)" },
      { label: "Packaging", value: "96 tips/rack, 10 racks/pack" },
    ],
    displayOrder: 30,
  },
  {
    id: "prod-004",
    title: "Bottle Top Dispenser",
    code: "SS-BTD-050",
    brand: "SSCIENCES",
    category: "Bottle Top Dispensers",
    subcategory: "Autoclavable",
    slug: "ssciences-bottle-top-dispenser-50ml",
    status: "Draft",
    updatedDate: "30 Aug 2026",
    overview:
      "Direct displacement bottle top dispenser equipped with recirculation valve to eliminate reagent loss during priming.",
    features: [
      "PTFE, FEP, borosilicate glass, and platinum-iridium wetted parts",
      "Telescoping FEP filling tube adjustable to varied bottle heights",
      "Safety discharge cap prevents accidental dispensing",
    ],
    specs: [
      { label: "Volume Range", value: "5.0–50.0 mL" },
      { label: "Graduation", value: "1.0 mL" },
      {
        label: "Thread Size",
        value: "GL 45 (adapters GL 28, 32, 38 included)",
      },
    ],
    displayOrder: 40,
  },
  {
    id: "prod-005",
    title: "DANWER Analytical Balance",
    code: "DAN-BAL-220",
    brand: "DANWER",
    category: "Laboratory Instruments",
    subcategory: "Precision Balances",
    slug: "danwer-analytical-balance-220g",
    status: "Published",
    updatedDate: "29 Aug 2026",
    overview:
      "Electromagnetic force restoration laboratory analytical balance featuring internal calibration and anti-static glass draft shield.",
    features: [
      "High-contrast backlit LCD with fast response stabilization",
      "Built-in RS232 and USB interfaces for ISO/GLP audit compliance data output",
      "Under-hook weighing capability for density determination",
    ],
    specs: [
      { label: "Max Capacity", value: "220 g" },
      { label: "Readability", value: "0.1 mg (0.0001 g)" },
      { label: "Pan Size", value: "Ø 90 mm stainless steel" },
    ],
    displayOrder: 50,
  },
  {
    id: "prod-006",
    title: "Electronic Pipette Controller",
    code: "LABXE-PC-010",
    brand: "LABXE",
    category: "Pipette Controllers",
    subcategory: "Motorized",
    slug: "labxe-electronic-pipette-controller",
    status: "Draft",
    updatedDate: "29 Aug 2026",
    overview:
      "Rechargeable motorized pipette filler compatible with glass and plastic serological pipettes from 0.1 mL to 100 mL.",
    features: [
      "Continuous speed adjustment with gravity and blow-out dispense modes",
      "Hydrophobic 0.45 µm membrane filter protecting internal motor from liquid ingress",
      "Lithium-ion battery providing over 12 hours of continuous operation",
    ],
    specs: [
      {
        label: "Pipette Compatibility",
        value: "0.1–100 mL serological / volumetric",
      },
      { label: "Aspiration Speed", value: "25 mL in < 5 seconds" },
      { label: "Weight", value: "190 g" },
    ],
    displayOrder: 60,
  },
];
