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
