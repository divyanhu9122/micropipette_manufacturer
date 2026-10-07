export type SearchContentType =
  | "Product"
  | "Micropipette Series"
  | "Category"
  | "Brand"
  | "Page";

export interface SearchItem {
  id: string;
  title: string;
  type: SearchContentType;
  href: string;
  description: string;
  keywords: string[];
  isComingSoon?: boolean;
  brand?: string;
}

export const searchableIndex: readonly SearchItem[] = [
  // 1. Products
  {
    id: "prod-science-plus-05-10",
    title: "Science Plus Variable Volume Micropipette (0.5–10 µL)",
    type: "Product",
    href: "/products/ssciences-science-plus-variable-05-10",
    description:
      "Precision single-channel variable volume pipette with click-stop volume adjustment and autoclavable lower assembly.",
    keywords: ["science plus", "variable volume", "ssciences", "single channel", "0.5-10", "micropipette"],
    brand: "SSCIENCES",
  },
  {
    id: "prod-science-plus-10-100",
    title: "Science Plus Variable Volume Micropipette (10–100 µL)",
    type: "Product",
    href: "/products/ssciences-science-plus-variable-10-100",
    description:
      "Reliable mid-volume mechanical pipette engineered for high reproducibility and broad chemical compatibility.",
    keywords: ["science plus", "variable volume", "ssciences", "single channel", "10-100", "micropipette"],
    brand: "SSCIENCES",
  },
  {
    id: "prod-fac-plus-20-200",
    title: "FAC Plus Fully Autoclavable Micropipette (20–200 µL)",
    type: "Product",
    href: "/products/ssciences-fac-plus-fully-autoclavable-20-200",
    description:
      "Fully autoclavable mechanical pipette designed for critical contamination control. 121°C steam sterilizable without disassembly.",
    keywords: ["fac plus", "autoclavable", "ssciences", "sterile", "20-200", "micropipette"],
    brand: "SSCIENCES",
  },
  {
    id: "prod-labxe-precision-100-1000",
    title: "LABXE Precision Series Variable Volume (100–1000 µL)",
    type: "Product",
    href: "/products/labxe-precision-variable-100-1000",
    description:
      "Heavy-duty milliliter-class variable pipette crafted from in-house precision injection molds with high chemical resistance.",
    keywords: ["labxe", "precision", "variable volume", "100-1000", "micropipette"],
    brand: "LABXE",
  },
  {
    id: "prod-multichannel-8ch-20-200",
    title: "SSCIENCES 8-Channel Variable Volume Micropipette (20–200 µL)",
    type: "Product",
    href: "/products/ssciences-multichannel-8ch-variable-20-200",
    description:
      "Ergonomic 8-channel pipette equipped with a 360° rotating manifold, individual piston assemblies, and uniform tip sealing.",
    keywords: ["8 channel", "multichannel", "ssciences", "microplate", "elisa", "micropipette"],
    brand: "SSCIENCES",
  },
  {
    id: "prod-danwer-electronic-05-10",
    title: "DANWER Electronic Single-Channel Pipette (0.5–10 µL)",
    type: "Product",
    href: "/products/danwer-electronic-single-05-10",
    description:
      "Microprocessor-driven motorized electronic pipette providing automatic aspiration, multidispensing, and zero thumb strain.",
    keywords: ["danwer", "electronic", "motorized", "single channel", "digital", "micropipette"],
    brand: "DANWER",
  },
  {
    id: "prod-labxe-multichannel-12ch",
    title: "LABXE 12-Channel Variable Volume Micropipette (10–100 µL)",
    type: "Product",
    href: "/products/labxe-multichannel-12ch-variable-10-100",
    description:
      "12-channel high-density laboratory instrument designed for fast row-by-row pipetting in standard 96-well microplates.",
    keywords: ["12 channel", "multichannel", "labxe", "microplate", "high throughput", "micropipette"],
    brand: "LABXE",
  },
  {
    id: "prod-science-plus-macro-10ml",
    title: "Science Plus Macro Variable Volume (1–10 mL)",
    type: "Product",
    href: "/products/ssciences-science-plus-macro-1-10ml",
    description:
      "High-capacity macro pipette designed for transferring large volumes with micropipette accuracy, complete with aerosol filter.",
    keywords: ["macro", "1-10 ml", "science plus", "ssciences", "large volume", "micropipette"],
    brand: "SSCIENCES",
  },
  {
    id: "prod-universal-tips",
    title: "Universal Pipette Tips",
    type: "Product",
    href: "/products?category=Lab+Plasticware",
    description:
      "High-quality universal compatible tips built for dependable fit, contamination control and consistent transfer accuracy.",
    keywords: ["pipette tips", "universal tips", "plasticware", "consumables", "labxe", "tips"],
    brand: "LABXE",
  },
  {
    id: "prod-tip-box-rack",
    title: "Tip Box & Rack System",
    type: "Product",
    href: "/products?category=Lab+Plasticware",
    description:
      "Structured storage solution for laboratory benches, designed for easy access, autoclaving, and clean organization.",
    keywords: ["tip box", "rack", "plasticware", "storage", "labxe"],
    brand: "LABXE",
  },
  {
    id: "prod-pipette-controller",
    title: "Pipette Controller",
    type: "Product",
    href: "/products?category=Pipette+Controller",
    description:
      "Compact motorized liquid handling controller built for comfortable operation and controlled aspiration/dispensing.",
    keywords: ["pipette controller", "motorized", "dispenser", "labxe"],
    brand: "LABXE",
  },
  {
    id: "prod-danwer-balance",
    title: "DANWER Analytical Balance",
    type: "Product",
    href: "/products?category=Lab+Balances",
    description:
      "Analytical weighing solution with stable electromagnetic force restoration performance for laboratory formulation.",
    keywords: ["analytical balance", "balance", "weighing", "danwer", "instruments"],
    brand: "DANWER",
  },

  // 2. Micropipette Series
  {
    id: "series-mini-plus",
    title: "Mini Plus minipipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#mini-plus",
    description: "Compact fixed and variable mini pipetting series for routine bench workflows and field diagnostic kits.",
    keywords: ["mini plus", "minipipette", "compact pipette", "portable pipette"],
  },
  {
    id: "series-science-plus",
    title: "Science Plus Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#science-plus",
    description: "Precision mechanical variable-volume micropipette series with ergonomic click-stop volume dial.",
    keywords: ["science plus", "micropipette", "mechanical", "variable volume"],
  },
  {
    id: "series-lab-plus",
    title: "Lab Plus Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#lab-plus",
    description: "High-accuracy laboratory micropipette series engineered for continuous diagnostic and research protocols.",
    keywords: ["lab plus", "micropipette", "labxe", "laboratory pipette"],
  },
  {
    id: "series-fac-plus",
    title: "FAC Plus Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#fac-plus",
    description: "Fully autoclavable liquid handling instruments with full-body 121°C steam decontamination without disassembly.",
    keywords: ["fac plus", "fully autoclavable", "micropipette", "autoclave", "sterile"],
  },
  {
    id: "series-durax",
    title: "DuraX Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#durax",
    description: "High-durability reinforced micropipette engineered for long operating life in harsh laboratory environments.",
    keywords: ["durax", "micropipette", "heavy duty", "durable pipette"],
  },
  {
    id: "series-ergo-plus",
    title: "Ergo Plus Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#ergo-plus",
    description: "Ergonomic series engineered for low plunger actuation forces, minimal thumb strain, and extended comfort.",
    keywords: ["ergo plus", "ergonomic", "micropipette", "low force"],
  },
  {
    id: "series-multi-plus",
    title: "Multi Plus Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#multi-plus",
    description: "Multichannel liquid handling solution for 96-well microplate dispensing with 360° rotatable manifold.",
    keywords: ["multi plus", "multichannel", "8 channel", "12 channel", "microplate"],
  },
  {
    id: "series-multi-pro",
    title: "Multi Pro Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#multi-pro",
    description: "Advanced multichannel professional pipetting instruments for high-throughput screening and genomics.",
    keywords: ["multi pro", "multichannel", "professional", "high throughput"],
  },
  {
    id: "series-prox",
    title: "ProX Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#coming-soon",
    description: "Next-generation precision instrument in final ISO 8655 gravimetric validation.",
    keywords: ["prox", "micropipette", "coming soon", "next generation"],
    isComingSoon: true,
  },
  {
    id: "series-primo-plus",
    title: "Primo Plus Micropipette",
    type: "Micropipette Series",
    href: "/products/micropipettes#coming-soon",
    description: "Advanced ergonomic liquid handling series scheduled for upcoming portfolio release.",
    keywords: ["primo plus", "micropipette", "coming soon", "ergonomic"],
    isComingSoon: true,
  },

  // 3. Categories
  {
    id: "cat-micropipette",
    title: "Micropipette",
    type: "Category",
    href: "/products/micropipettes",
    description: "Explore all micropipettes by classification — variable volume, fixed volume, multichannel, electronic, and mechanical.",
    keywords: ["micropipette", "pipette", "liquid handling", "category"],
  },
  {
    id: "cat-bottle-top-dispenser",
    title: "Bottle Top Dispenser",
    type: "Category",
    href: "/products?category=Bottle+Top+Dispenser",
    description: "High-accuracy reagent and solvent bottle-top liquid dispensing systems with chemical-resistant fluid paths.",
    keywords: ["bottle top dispenser", "dispenser", "reagent", "liquid dispenser"],
  },
  {
    id: "cat-pipette-controller",
    title: "Pipette Controller",
    type: "Category",
    href: "/products?category=Pipette+Controller",
    description: "Motorized and ergonomic pipetting aids and controllers for serological and volumetric pipettes.",
    keywords: ["pipette controller", "serological", "motorized", "pipette filler"],
  },
  {
    id: "cat-lab-plasticware",
    title: "Lab Plasticware",
    type: "Category",
    href: "/products?category=Lab+Plasticware",
    description: "Universal pipette tips, filter tips, tip boxes, racks, and laboratory consumables.",
    keywords: ["lab plasticware", "pipette tips", "plasticware", "tips", "racks", "consumables"],
  },
  {
    id: "cat-lab-balances",
    title: "Lab Balances",
    type: "Category",
    href: "/products?category=Lab+Balances",
    description: "Precision analytical balances and micro-weighing instrumentation for laboratory formulation.",
    keywords: ["lab balances", "balances", "analytical balance", "weighing scale"],
  },
  {
    id: "cat-laboratory-instruments",
    title: "Laboratory Instruments",
    type: "Category",
    href: "/products?category=Laboratory+Instruments",
    description: "Benchtop laboratory instrumentation, accessories, and calibration equipment.",
    keywords: ["laboratory instruments", "instruments", "equipment", "benchtop"],
  },
  {
    id: "subcat-variable-volume",
    title: "Variable Volume Micropipettes",
    type: "Category",
    href: "/products/micropipettes/variable-volume",
    description: "Browse single and multichannel variable volume micropipettes with adjustable click-stop dials.",
    keywords: ["variable volume", "micropipettes", "adjustable pipette"],
  },
  {
    id: "subcat-fixed-volume",
    title: "Fixed Volume Micropipettes",
    type: "Category",
    href: "/products/micropipettes/fixed-volume",
    description: "Dedicated single-volume micropipettes for repetitive assays and standardized clinical protocols.",
    keywords: ["fixed volume", "micropipettes", "standard pipette"],
  },
  {
    id: "subcat-single-channel",
    title: "Single Channel Micropipettes",
    type: "Category",
    href: "/products/micropipettes/single-channel",
    description: "Precision single-channel micropipettes for routine sample transfer and microcentrifuge tube handling.",
    keywords: ["single channel", "micropipettes"],
  },
  {
    id: "subcat-multichannel",
    title: "Multichannel Micropipettes",
    type: "Category",
    href: "/products/micropipettes/multichannel",
    description: "8-channel and 12-channel micropipettes designed for microplate liquid transfer and ELISA screening.",
    keywords: ["multichannel", "8 channel", "12 channel", "microplate"],
  },
  {
    id: "subcat-electronic",
    title: "Electronic Micropipettes",
    type: "Category",
    href: "/products/micropipettes/electronic",
    description: "Motorized electronic pipetting aids with digital display, multi-dispense, and automated mixing.",
    keywords: ["electronic", "digital pipette", "motorized pipette"],
  },
  {
    id: "subcat-mechanical",
    title: "Mechanical Micropipettes",
    type: "Category",
    href: "/products/micropipettes/mechanical",
    description: "Manual mechanical pipettes engineered for chemical durability, field calibration, and thermal insulation.",
    keywords: ["mechanical", "manual pipette"],
  },

  // 4. Brands
  {
    id: "brand-labxe",
    title: "LABXE",
    type: "Brand",
    href: "/brands/labxe",
    description: "Precision liquid handling and molecular diagnostic instruments engineered for clinical and analytical laboratories.",
    keywords: ["labxe", "brand", "molecular", "clinical"],
    brand: "LABXE",
  },
  {
    id: "brand-ssciences",
    title: "SSCIENCES",
    type: "Brand",
    href: "/brands/ssciences",
    description: "High-precision gravimetrically calibrated micropipettes and bottle-top liquid dispensers.",
    keywords: ["ssciences", "brand", "life science", "genomics"],
    brand: "SSCIENCES",
  },
  {
    id: "brand-danwer",
    title: "DANWER",
    type: "Brand",
    href: "/brands/danwer",
    description: "Heavy-duty analytical micro-weighing systems, motorized pipettes, and fluid transfer equipment.",
    keywords: ["danwer", "brand", "industrial", "balances"],
    brand: "DANWER",
  },
  {
    id: "brand-dr-pipette",
    title: "dr.pipette",
    type: "Brand",
    href: "/brands/dr-pipette",
    description: "Precision liquid handling and pipetting solutions manufactured for scientific and clinical laboratories.",
    keywords: ["dr.pipette", "dr pipette", "drpipette", "brand", "liquid handling"],
    brand: "dr.pipette",
  },
  {
    id: "brand-sscientific",
    title: "sscientific",
    type: "Brand",
    href: "/brands/sscientific",
    description: "Scientific instrumentation and volumetric measurement solutions engineered for high laboratory accuracy.",
    keywords: ["sscientific", "s scientific", "brand", "measurement", "instruments"],
    brand: "sscientific",
  },

  // 5. Information Pages
  {
    id: "page-products",
    title: "All Products Listing",
    type: "Page",
    href: "/products",
    description: "Complete laboratory product catalog with category, brand, channel, and volume filtering.",
    keywords: ["products", "catalog", "store", "all products", "filter"],
  },
  {
    id: "page-brands",
    title: "Brand Portfolio",
    type: "Page",
    href: "/brands",
    description: "Overview of specialized manufacturing brands united under our unified quality assurance umbrella.",
    keywords: ["brands", "portfolio", "manufacturers"],
  },
  {
    id: "page-about",
    title: "About Us",
    type: "Page",
    href: "/about",
    description: "Learn about our ISO 8655 certified liquid handling manufacturing facility, quality assurance, and global distribution.",
    keywords: ["about", "company", "facility", "manufacturing", "iso 8655", "quality"],
  },
  {
    id: "page-oem",
    title: "OEM & Private Label",
    type: "Page",
    href: "/oem",
    description: "Custom contract manufacturing, private-label branding, custom molds, and bulk volume supply for global distributors.",
    keywords: ["oem", "private label", "contract manufacturing", "bulk", "white label"],
  },
  {
    id: "page-applications",
    title: "Applications",
    type: "Page",
    href: "/applications",
    description: "Discover laboratory protocols and application workflows across Genomics, Cell Culture, Clinical Chemistry, and Microbiology.",
    keywords: ["applications", "genomics", "cell culture", "pcr", "chemistry", "microbiology"],
  },
  {
    id: "page-resources",
    title: "Resources & Datasheets",
    type: "Page",
    href: "/resources",
    description: "Central repository of product technical datasheets, user manuals, calibration guidelines, and catalogues.",
    keywords: ["resources", "downloads", "datasheets", "manuals", "catalogues", "pdf"],
  },
  {
    id: "page-contact",
    title: "Contact & Support",
    type: "Page",
    href: "/contact",
    description: "Get in touch with our technical sales, export distribution, and customer support teams.",
    keywords: ["contact", "support", "email", "phone", "sales", "inquiry"],
  },
  {
    id: "page-faq",
    title: "Frequently Asked Questions",
    type: "Page",
    href: "/faq",
    description: "Answers to common questions regarding ISO calibration, ordering, warranty, autoclaving, and delivery.",
    keywords: ["faq", "help", "questions", "calibration", "warranty"],
  },
  {
    id: "page-request-quote",
    title: "Request a Quote",
    type: "Page",
    href: "/request-quote",
    description: "Request a competitive B2B quotation for laboratory instruments, bulk orders, or distributor inquiries.",
    keywords: ["quote", "request quote", "pricing", "rfq", "b2b pricing"],
  },
  {
    id: "page-terms",
    title: "Terms & Conditions",
    type: "Page",
    href: "/terms",
    description: "B2B sales terms, shipping policies, warranty terms, and international commercial policies.",
    keywords: ["terms", "conditions", "warranty", "policy", "legal"],
  },
  {
    id: "page-privacy",
    title: "Privacy Policy",
    type: "Page",
    href: "/privacy-policy",
    description: "Our data protection practices, privacy commitments, and handling of B2B inquiry data.",
    keywords: ["privacy", "policy", "data protection"],
  },
];

/**
 * Normalizes query string for tolerant matching:
 * - Trims and lowercases
 * - Collapses spaces
 * - Strips non-alphanumeric punctuation (except periods/hyphens)
 */
export function normalizeQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Executes tolerant search over the searchable index
 */
export function searchItems(rawQuery: string): SearchItem[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  // Compact variant without punctuation or spaces for matching (e.g. "drpipette" === "dr.pipette")
  const compactQuery = query.replace(/[\s.\-_]/g, "");

  return searchableIndex.filter((item) => {
    const titleNorm = item.title.toLowerCase();
    const compactTitle = titleNorm.replace(/[\s.\-_]/g, "");
    if (titleNorm.includes(query) || compactTitle.includes(compactQuery)) return true;

    const descNorm = item.description.toLowerCase();
    const compactDesc = descNorm.replace(/[\s.\-_]/g, "");
    if (descNorm.includes(query) || compactDesc.includes(compactQuery)) return true;

    if (item.type.toLowerCase().includes(query)) return true;
    if (item.brand && item.brand.toLowerCase().includes(query)) return true;

    // Keywords matching
    return item.keywords.some((kw) => {
      const kwNorm = kw.toLowerCase();
      const compactKw = kwNorm.replace(/[\s.\-_]/g, "");
      return kwNorm.includes(query) || query.includes(kwNorm) || compactKw.includes(compactQuery);
    });
  });
}
