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

// ==========================================
// CATEGORIES & TAXONOMY (Phase 4.4)
// ==========================================

export interface AdminCategoryItem {
  id: string;
  name: string;
  slug: string;
  parent?: string; // e.g. "Micropipettes" or undefined if top-level
  status: "Published" | "Draft";
  order: number;
  description: string;
  seoTitle?: string;
  metaDesc?: string;
}

export const INITIAL_ADMIN_CATEGORIES: AdminCategoryItem[] = [
  {
    id: "cat-001",
    name: "Micropipettes",
    slug: "micropipettes",
    status: "Published",
    order: 1,
    description: "Precision single channel and multichannel mechanical and electronic micropipettes.",
    seoTitle: "Precision Micropipettes | Manufacturer Liquid Handling",
    metaDesc: "Explore factory-calibrated single-channel and multichannel laboratory micropipettes with ISO 8655 compliance.",
  },
  {
    id: "cat-002",
    name: "Variable Volume",
    slug: "variable-volume",
    parent: "Micropipettes",
    status: "Published",
    order: 1,
    description: "Adjustable volume pipettes featuring click-stop micro-increments and ergonomic plunger kinematics.",
    seoTitle: "Variable Volume Micropipettes | Click-Stop Precision",
    metaDesc: "Single and multichannel variable volume micropipettes covering 0.1 µL to 10 mL with autoclavable lower manifolds.",
  },
  {
    id: "cat-003",
    name: "Multichannel",
    slug: "multichannel",
    parent: "Micropipettes",
    status: "Published",
    order: 2,
    description: "8-channel and 12-channel high-throughput pipettes optimized for 96-well microplate applications.",
    seoTitle: "Multichannel Micropipettes (8 & 12 Channel)",
    metaDesc: "Ergonomic 8-channel and 12-channel micropipettes with 360-degree rotating manifolds for microplate processing.",
  },
  {
    id: "cat-004",
    name: "Pipette Tips",
    slug: "pipette-tips",
    status: "Published",
    order: 2,
    description: "Universal-fit, low-retention, and aerosol filter barrier pipette tips manufactured in cleanrooms.",
    seoTitle: "Certified Laboratory Pipette Tips | Low Retention & Filter",
    metaDesc: "DNase, RNase and endotoxin free universal pipette tips in bulk bags, racked, and reload packaging.",
  },
  {
    id: "cat-005",
    name: "Bottle Top Dispensers",
    slug: "bottle-top-dispensers",
    status: "Draft",
    order: 3,
    description: "Direct displacement bottle-mounted reagent dispensers with recirculation priming valves.",
    seoTitle: "Bottle Top Dispensers | Chemical Resistant Reagent Dosing",
    metaDesc: "Precision bottle-top dispensers for corrosive acids, bases and organic solvents with GL45 standard threading.",
  },
  {
    id: "cat-006",
    name: "Pipette Controllers",
    slug: "pipette-controllers",
    status: "Published",
    order: 4,
    description: "Lightweight motorized pipette aids and rubber bulb fillers for serological and volumetric pipettes.",
    seoTitle: "Motorized Pipette Controllers & Fillers",
    metaDesc: "Ergonomic electronic pipette fillers compatible with 0.1–100 mL plastic and glass serological pipettes.",
  },
  {
    id: "cat-007",
    name: "Lab Instruments",
    slug: "lab-instruments",
    status: "Published",
    order: 5,
    description: "Complementary laboratory analytical balances, vortex mixers, and benchtop microcentrifuges.",
    seoTitle: "Laboratory Instruments & Benchtop Equipment",
    metaDesc: "Precision analytical balances, micro-centrifuges, and laboratory instruments built for reliable scientific workflows.",
  },
];

// ==========================================
// BRAND MANAGEMENT (Phase 4.5)
// ==========================================

export interface AdminBrandItem {
  id: string;
  name: "LABXE" | "SSCIENCES" | "DANWER";
  tagline: string;
  slug: string;
  status: "Published" | "Draft";
  displayOrder: number;
  summary: string;
  logo: string;
  productsLinkedCount: number;
  seoTitle?: string;
  metaDesc?: string;
}

export const INITIAL_ADMIN_BRANDS: AdminBrandItem[] = [
  {
    id: "brand-01",
    name: "LABXE",
    tagline: "Precision Micropipettes",
    slug: "labxe",
    status: "Published",
    displayOrder: 1,
    summary:
      "Engineered for research laboratories requiring high repetitive accuracy, ergonomic fatigue reduction, and fully certified ISO 8655 calibration conformity.",
    logo: "/images/brand/micropipette-manufacturer-logo.png",
    productsLinkedCount: 3,
    seoTitle: "LABXE Precision Micropipettes | Official Brand Portfolio",
    metaDesc: "Discover the complete LABXE micropipette line featuring variable single-channel and 8-channel precision instruments.",
  },
  {
    id: "brand-02",
    name: "SSCIENCES",
    tagline: "Singh Science Systems · Technology For Better Science",
    slug: "ssciences",
    status: "Published",
    displayOrder: 2,
    summary:
      "A heritage of liquid handling engineering delivering durable bottle-top dispensers, universal low-retention pipette tips, and laboratory consumables.",
    logo: "/images/brand/micropipette-manufacturer-logo.png",
    productsLinkedCount: 2,
    seoTitle: "SSCIENCES (Singh Science Systems) | Laboratory Liquid Handling",
    metaDesc: "Explore the SSCIENCES catalog including direct displacement bottle-top dispensers and aerosol barrier filter tips.",
  },
  {
    id: "brand-03",
    name: "DANWER",
    tagline: "Analytical Instruments",
    slug: "danwer",
    status: "Published",
    displayOrder: 3,
    summary:
      "Analytical balances and precision laboratory equipment built to provide verified accuracy in quality assurance, pharmaceutical analysis, and academic research.",
    logo: "/images/brand/micropipette-manufacturer-logo.png",
    productsLinkedCount: 1,
    seoTitle: "DANWER Analytical Instruments | Precision Laboratory Balances",
    metaDesc: "Certified DANWER analytical and precision balances offering internal calibration and GLP/ISO compliant data logging.",
  },
];

// ==========================================
// RESOURCES & DOCUMENTS (Phase 4.6)
// ==========================================

export type ResourceType =
  | "Catalogue"
  | "Brochure"
  | "Datasheet"
  | "Manual"
  | "Certificate"
  | "Calibration-related"
  | "Other Technical File";

export interface AdminResourceItem {
  id: string;
  title: string;
  type: ResourceType;
  associations: string;
  fileFormat: string;
  fileSize: string;
  status: "Published" | "Draft";
  brandAssoc?: string;
  categoryAssoc?: string;
  productAssoc?: string;
  downloadLabel: string;
  seoTitle?: string;
  metaDesc?: string;
}

export const INITIAL_ADMIN_RESOURCES: AdminResourceItem[] = [
  {
    id: "res-001",
    title: "Liquid Handling Catalogue",
    type: "Catalogue",
    associations: "LABXE · Micropipettes",
    fileFormat: "PDF",
    fileSize: "4.2 MB",
    status: "Published",
    brandAssoc: "LABXE",
    categoryAssoc: "Micropipettes",
    productAssoc: "LABXE Micropipette Single Channel",
    downloadLabel: "Download Catalogue",
    seoTitle: "Liquid Handling Master Catalogue | Download PDF",
    metaDesc: "Official comprehensive product catalogue detailing liquid handling equipment, pipettes, and technical specifications.",
  },
  {
    id: "res-002",
    title: "Variable Volume Product Datasheet",
    type: "Datasheet",
    associations: "Product · LABXE",
    fileFormat: "PDF",
    fileSize: "1.8 MB",
    status: "Published",
    brandAssoc: "LABXE",
    categoryAssoc: "Micropipettes",
    productAssoc: "LABXE Micropipette Single Channel",
    downloadLabel: "Download Datasheet",
    seoTitle: "Variable Volume Micropipette Datasheet PDF",
    metaDesc: "Technical specifications, volumetric tolerance limits, and chemical resistance matrix for variable volume pipettes.",
  },
  {
    id: "res-003",
    title: "User Manual — LABXE Precision Series",
    type: "Manual",
    associations: "Micropipettes",
    fileFormat: "PDF",
    fileSize: "2.4 MB",
    status: "Draft",
    brandAssoc: "LABXE",
    categoryAssoc: "Micropipettes",
    productAssoc: "LABXE Micropipette Single Channel",
    downloadLabel: "Download User Manual",
    seoTitle: "LABXE Micropipette User Manual & Operating Guide",
    metaDesc: "Operating instructions, in-lab gravimetric calibration procedure, autoclave sterilization guidelines and maintenance.",
  },
  {
    id: "res-004",
    title: "ISO 9001:2015 & CE Quality Declarations",
    type: "Certificate",
    associations: "All Brands",
    fileFormat: "PDF",
    fileSize: "850 KB",
    status: "Published",
    brandAssoc: "None",
    categoryAssoc: "None",
    productAssoc: "None",
    downloadLabel: "Download Certificate",
    seoTitle: "ISO 9001 & CE Quality Compliance Declarations",
    metaDesc: "Official manufacturer quality management certificates and European conformity documentation.",
  },
  {
    id: "res-005",
    title: "Micro-Volume Gravimetric Calibration Chart",
    type: "Calibration-related",
    associations: "Micropipettes · LABXE",
    fileFormat: "PDF",
    fileSize: "1.1 MB",
    status: "Published",
    brandAssoc: "LABXE",
    categoryAssoc: "Micropipettes",
    productAssoc: "LABXE Micropipette Multi Channel",
    downloadLabel: "Download Calibration Chart",
    seoTitle: "ISO 8655 Gravimetric Calibration Guidelines",
    metaDesc: "Factory calibration reference guide, Z-factor correction tables, and volumetric tolerance allowances.",
  },
];

// ==========================================
// BLOG ARTICLES (Phase 4.7)
// ==========================================

export interface AdminBlogItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  status: "Published" | "Draft";
  excerpt: string;
  content: string;
  tags: string[];
  relatedArticles?: string[];
  faq?: string;
  seoTitle?: string;
  metaDesc?: string;
}

export const INITIAL_ADMIN_BLOG_ARTICLES: AdminBlogItem[] = [
  {
    id: "blog-001",
    title: "Choosing a Micropipette Range for Daily Diagnostics",
    slug: "choosing-a-micropipette-range",
    category: "Liquid Handling",
    author: "Admin User",
    date: "01 Sep 2026",
    status: "Published",
    excerpt:
      "A comprehensive guide on selecting the correct variable volume ranges and ergonomic parameters for high-throughput clinical laboratory workflows.",
    content:
      "Selecting the appropriate micropipette range is critical for maintaining pipette accuracy and pipetting ergonomics in molecular biology and diagnostic labs...",
    tags: ["micropipette", "liquid handling", "diagnostics", "ISO 8655"],
    relatedArticles: ["Understanding Pipette Tip Compatibility", "Laboratory Liquid Handling Checklist"],
    faq: "Q: Which volume range yields optimal accuracy?\nA: For highest precision, pipette in the 35% to 100% region of the nominal volume range.",
    seoTitle: "Choosing a Micropipette Range | Technical Guide",
    metaDesc: "Learn how to select volume ranges and ergonomic channel configurations to achieve maximum pipetting accuracy.",
  },
  {
    id: "blog-002",
    title: "Understanding Pipette Tip Compatibility & Retention Loss",
    slug: "understanding-pipette-tip-compatibility",
    category: "Product Guidance",
    author: "Content Editor A",
    date: "31 Aug 2026",
    status: "Draft",
    excerpt:
      "How tip geometry, cleanroom manufacturing standards, and hydrophobic polymer surface treatments influence pipetting accuracy.",
    content:
      "A micropipette and its disposable tip function as an interconnected measuring system. Mismatched tip cones cause sealing leaks and volume errors...",
    tags: ["pipette tips", "low retention", "cleanroom", "sample recovery"],
    relatedArticles: ["Choosing a Micropipette Range"],
    seoTitle: "Pipette Tip Compatibility & Retention Loss Guide",
    metaDesc: "Deep dive into aerosol barrier filter tips, tip nozzle geometry, and low-retention surface chemistry.",
  },
  {
    id: "blog-003",
    title: "Laboratory Liquid Handling Checklist: Maintenance & Calibration",
    slug: "laboratory-liquid-handling-checklist",
    category: "Resources",
    author: "Content Editor B",
    date: "29 Aug 2026",
    status: "Published",
    excerpt:
      "Standard operating checklist for daily seal inspection, monthly gravimetric validation, and autoclave decontamination protocols.",
    content:
      "Regular pipette servicing and gravimetric calibration testing under ISO 8655 guidelines ensure long-term reproducibility and regulatory audit readiness...",
    tags: ["calibration", "maintenance", "autoclave", "quality assurance"],
    relatedArticles: ["Choosing a Micropipette Range"],
    seoTitle: "Laboratory Liquid Handling Checklist | ISO 8655",
    metaDesc: "Essential daily and monthly maintenance checklist for laboratory pipettes, seal rings, and calibration checks.",
  },
];

// ==========================================
// SEO & WEBSITE SETTINGS (Phase 4.12)
// ==========================================

export interface PageSeoRecord {
  id: string;
  pageName: string;
  path: string;
  seoTitle: string;
  metaDesc: string;
  canonical: string;
  robots: string;
}

export interface AdminSettingsData {
  siteName: string;
  tagline: string;
  defaultDescription: string;
  primaryLogo: string;
  favicon: string;
  defaultTitlePattern: string;
  defaultMetaDescription: string;
  defaultCanonical: string;
  defaultRobots: string;
  openGraphImage: string;
  twitterCard: string;
  pageRecords: PageSeoRecord[];
  contactEmail: string;
  contactPhone: string;
  address: string;
  linkedin: string;
  twitter: string;
}

export const INITIAL_ADMIN_SETTINGS: AdminSettingsData = {
  siteName: "MicropipetteManufacturer.com",
  tagline: "Precision. Performance. Partnership.",
  defaultDescription:
    "Central B2B platform for LABXE, SSCIENCES and DANWER product discovery, OEM solutions and global enquiries.",
  primaryLogo: "/images/brand/micropipette-manufacturer-logo.png",
  favicon: "/favicon.ico",
  defaultTitlePattern: "{page_title} | MicropipetteManufacturer.com",
  defaultMetaDescription:
    "Certified manufacturer of precision micropipettes, pipette tips, bottle-top dispensers and laboratory liquid handling equipment.",
  defaultCanonical: "Use page URL unless overridden",
  defaultRobots: "Index, follow",
  openGraphImage: "/images/brand/micropipette-manufacturer-logo.png",
  twitterCard: "Summary large image",
  contactEmail: "sales@micropipettemanufacturer.com",
  contactPhone: "+91 98200 00000",
  address: "Precision Manufacturing Park, Sector 4, Gujarat, India",
  linkedin: "https://linkedin.com/company/micropipette-manufacturer",
  twitter: "https://x.com/micropipette_mfg",
  pageRecords: [
    {
      id: "p-home",
      pageName: "Homepage",
      path: "/",
      seoTitle: "Micropipette Manufacturer & Laboratory Liquid Handling Solutions",
      metaDesc: "Certified manufacturer of variable volume micropipettes, pipette tips, and bottle-top dispensers for global laboratories.",
      canonical: "https://micropipettemanufacturer.com/",
      robots: "Index, follow",
    },
    {
      id: "p-prod",
      pageName: "Products Listing",
      path: "/products/",
      seoTitle: "Laboratory Liquid Handling Products & Consumables",
      metaDesc: "Browse calibrated micropipettes, filter tips, electronic controllers, and laboratory instrumentation.",
      canonical: "https://micropipettemanufacturer.com/products/",
      robots: "Index, follow",
    },
    {
      id: "p-brand",
      pageName: "Brand Portfolio",
      path: "/brands/",
      seoTitle: "Brand Portfolio | LABXE, SSCIENCES & DANWER",
      metaDesc: "Official brand catalog covering precision liquid handling, analytical balances, and medical cleanroom consumables.",
      canonical: "https://micropipettemanufacturer.com/brands/",
      robots: "Index, follow",
    },
    {
      id: "p-res",
      pageName: "Resources & Download Center",
      path: "/resources/",
      seoTitle: "Technical Download Center | Manuals, Catalogues & ISO Certificates",
      metaDesc: "Download official product brochures, user operating manuals, gravimetric calibration charts, and CE declarations.",
      canonical: "https://micropipettemanufacturer.com/resources/",
      robots: "Index, follow",
    },
    {
      id: "p-oem",
      pageName: "OEM & Private Label",
      path: "/oem/",
      seoTitle: "OEM & Private Label Micropipette Manufacturing Solutions",
      metaDesc: "Custom molding, private labeling, color customization, and contract manufacturing for laboratory distributor brands.",
      canonical: "https://micropipettemanufacturer.com/oem/",
      robots: "Index, follow",
    },
  ],
};
