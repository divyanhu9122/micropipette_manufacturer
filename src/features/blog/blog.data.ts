// Blog feature mock data
// Status: Static data for prototype; will migrate to CMS in Stage 10.

export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  tags: string[];
  author: BlogAuthor;
  publishedDate: string;
  readingTime: string;
  featured: boolean;
}

export const BLOG_CATEGORIES = [
  "All",
  "Technical Guides",
  "Product Updates",
  "Industry Insights",
  "Application Notes",
  "Company News",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "iso-8655-gravimetric-testing",
    slug: "iso-8655-gravimetric-testing-explained",
    title: "ISO 8655 Gravimetric Testing: What Every Lab Manager Should Know",
    excerpt:
      "A practical breakdown of the ISO 8655 gravimetric calibration standard — how it governs micropipette accuracy, what compliance means for your laboratory, and why manufacturer-certified calibration matters for regulatory audits.",
    body: [
      "ISO 8655 is the international standard governing the design, metrological requirements, and testing methods for piston-operated volumetric apparatus, including micropipettes. For laboratory managers, understanding this standard is fundamental to maintaining analytical accuracy and audit readiness.",
      "The standard is divided into multiple parts: Part 1 covers terminology and general requirements; Parts 2 through 5 address specific instrument types (air-displacement pipettes, positive-displacement pipettes, burettes, and dilutors); Part 6 describes the gravimetric reference test method.",
      "Gravimetric testing, specified in Part 6, is the gold standard for calibrating micropipettes. The principle is straightforward: a known volume of distilled water is dispensed and weighed on an analytical balance. The mass is converted to volume using the water density at the measured temperature, incorporating corrections for air buoyancy and evaporation.",
      "For each nominal volume being tested, ISO 8655 requires a minimum of 10 replicate measurements. Two key metrics are computed from these measurements: systematic error (accuracy), expressed as the deviation of the mean dispensed volume from the nominal volume, and random error (precision), expressed as the coefficient of variation (CV%) of the replicate measurements. Both must fall within the maximum permissible errors specified in the relevant part of the standard.",
      "Manufacturer-certified gravimetric calibration provides traceable evidence that every micropipette leaving the production line meets these accuracy and precision thresholds. This traceability chain — from the factory's analytical balance (itself calibrated against national metrology standards) through the testing environment (temperature and humidity controlled) to the individual serial-numbered instrument — is what regulatory bodies like FDA, EMA, and ISO 17025-accredited auditors require.",
      "Key factors that affect gravimetric test results include ambient temperature stability (ideally 20 ± 0.5 °C), humidity (recommended 50 ± 10% RH to minimize evaporation), the equilibration time of the distilled water and micropipette, and the technique of the operator. This is why manufacturer calibration, performed in controlled environments by trained technicians, consistently outperforms field recalibration.",
      "When selecting a micropipette manufacturer, request documentation of their gravimetric testing protocol, the balance readability used (≤ 0.01 mg for sub-microliter volumes), and the environmental monitoring records. Legitimate manufacturers will provide a calibration certificate with serial number, test date, nominal volumes tested, measured accuracy and precision values, and the identity of the testing technician.",
    ],
    category: "Technical Guides",
    tags: [
      "ISO 8655",
      "Gravimetric Calibration",
      "Quality Assurance",
      "Regulatory Compliance",
    ],
    author: {
      name: "Technical Engineering Desk",
      role: "Calibration & Metrology Division",
    },
    publishedDate: "2026-09-15",
    readingTime: "8 min read",
    featured: true,
  },
  {
    id: "choosing-right-micropipette",
    slug: "choosing-right-micropipette-for-your-lab",
    title:
      "Choosing the Right Micropipette: A Buyer's Guide for Laboratory Procurement",
    excerpt:
      "Variable volume vs. fixed volume, single channel vs. multichannel, air displacement vs. positive displacement — a structured comparison to help procurement teams and lab managers select the right micropipette type for their workflows.",
    body: [
      "Selecting the right micropipette is a critical decision for any laboratory. The wrong choice doesn't just affect workflow efficiency — it directly impacts data accuracy, operator ergonomics, and long-term cost of ownership. This guide addresses the key decision points that procurement teams and laboratory managers face.",
      "The first decision is between variable volume and fixed volume micropipettes. Variable volume instruments allow adjustment within a specified range (e.g., 10–100 µL) via a mechanical dial or digital interface. Fixed volume models are factory-set to a single nominal volume. Variable volume micropipettes offer flexibility across protocols, while fixed volume models eliminate the risk of accidental volume changes and are preferred for repetitive assays with a single critical volume.",
      "The second decision is the displacement mechanism. Air-displacement micropipettes use an air cushion between the piston and the liquid sample. They are suitable for most aqueous solutions under standard laboratory conditions. Positive-displacement micropipettes use a disposable capillary piston that contacts the liquid directly, eliminating the air cushion. These are essential for viscous, volatile, or high-density liquids where surface tension and vapor pressure would cause systematic errors with air-displacement designs.",
      "Channel count is the third consideration. Single-channel micropipettes are the workhorse of individual tube-to-tube transfers. Multichannel micropipettes (8-channel or 12-channel) dramatically increase throughput for microplate-based workflows such as ELISA, PCR preparation, and serial dilutions. The trade-off is cost and complexity — multichannel units require more maintenance and tip compatibility verification.",
      "Ergonomics deserve serious attention, especially in laboratories with high-throughput pipetting demands. Features to evaluate include plunger force (lower is better for reducing repetitive strain), grip diameter (should match average hand size), weight, and balance point. A pipette that feels comfortable for five minutes may cause fatigue and musculoskeletal injury after eight hours of continuous use.",
      "Finally, consider the total cost of ownership beyond the unit price. Factor in tip compatibility and cost (universal vs. proprietary tips), calibration service frequency and cost, expected lifespan, warranty terms, and availability of replacement parts. A manufacturer that offers in-house gravimetric recalibration services and stocks replacement seals and pistons will deliver significantly lower lifetime cost than a brand that requires third-party service.",
    ],
    category: "Technical Guides",
    tags: [
      "Micropipette Selection",
      "Laboratory Procurement",
      "Liquid Handling",
      "Buyer's Guide",
    ],
    author: {
      name: "Sales Engineering Team",
      role: "B2B Solutions Division",
    },
    publishedDate: "2026-08-28",
    readingTime: "7 min read",
    featured: true,
  },
  {
    id: "autoclave-micropipette-care",
    slug: "autoclave-micropipette-maintenance-best-practices",
    title:
      "Autoclave-Safe Micropipettes: Sterilization Protocols and Maintenance Best Practices",
    excerpt:
      "How to properly autoclave fully and partially autoclavable micropipettes without degrading volumetric accuracy, along with daily and monthly maintenance schedules that extend instrument lifespan.",
    body: [
      "Autoclaving is the most reliable method of sterilizing laboratory micropipettes for applications requiring aseptic liquid transfer — genomics, cell culture, molecular biology, and clinical diagnostics. However, improper autoclaving is also one of the most common causes of micropipette failure and calibration drift.",
      "Understanding the distinction between fully autoclavable and partially autoclavable micropipettes is critical. Fully autoclavable models (such as the SSCIENCES FAC Plus series) can be steam-sterilized in their entirety at 121 °C for 20 minutes without disassembly or post-autoclave recalibration. Their internal components — pistons, seals, springs, and housing — are manufactured from thermally stable engineering polymers and stainless steel alloys that retain dimensional precision through repeated heat cycles.",
      "Partially autoclavable micropipettes allow sterilization of the lower shaft and tip cone assembly only. The upper body, which contains the volume adjustment mechanism and plunger spring, must not enter the autoclave. For these instruments, disassemble the lower section according to the manufacturer's instructions before autoclaving.",
      "Regardless of autoclavability rating, follow these protocols: always allow the micropipette to reach room temperature and equilibrate for at least 30 minutes before use after autoclaving; never autoclave with a tip attached; use only validated steam autoclave cycles (121 °C, 15 psi, 20 minutes); do not use dry-heat sterilization unless the manufacturer explicitly supports it; and document each autoclave cycle in the instrument's maintenance log.",
      "For daily maintenance, wipe the exterior with 70% isopropyl alcohol or an approved disinfectant. Inspect the tip cone for damage, corrosion, or residue buildup. Check that the volume dial moves smoothly without play or stiffness. For monthly maintenance, disassemble the piston assembly (following the manufacturer's service manual), clean and lightly lubricate the piston and sealing surfaces, inspect O-rings and seals for wear, and perform a quick gravimetric check at the instrument's nominal volume.",
      "Schedule full gravimetric recalibration at least annually, or more frequently if the instrument is subject to heavy autoclave cycling (more than once per week). Maintain a calibration log that records the date, technician, balance used, environmental conditions, and measured accuracy and precision values. This documentation is essential for ISO 17025 and GLP compliance.",
    ],
    category: "Technical Guides",
    tags: [
      "Autoclave",
      "Sterilization",
      "Maintenance",
      "SSCIENCES",
      "Micropipette Care",
    ],
    author: {
      name: "Quality Assurance Lab",
      role: "Manufacturing & Service Division",
    },
    publishedDate: "2026-08-10",
    readingTime: "6 min read",
    featured: false,
  },
  {
    id: "oem-private-label-micropipettes",
    slug: "oem-private-label-micropipette-manufacturing",
    title:
      "OEM & Private-Label Micropipette Manufacturing: How It Works and What to Expect",
    excerpt:
      "An inside look at our OEM manufacturing process — from custom branding and volumetric specification to quality certification and logistics — for distributors, institutions, and brands looking to source private-label pipettes.",
    body: [
      "OEM (Original Equipment Manufacturing) and private-label pipette production is a core capability of our manufacturing facility. This article explains the end-to-end process for distributors, laboratory equipment brands, and institutional procurement teams considering custom-branded micropipettes.",
      "The process begins with a specification review. The OEM partner provides their required volumetric ranges, channel configurations, color schemes, branding elements (logo placement, model nomenclature), and packaging requirements. Our engineering team reviews these against our existing tooling library and production capability. Many orders can be fulfilled from existing mold families with custom color inserts and branding, while truly novel designs may require new tooling investment.",
      "Once specifications are agreed upon, a pre-production sample run (typically 10–50 units) is manufactured and gravimetrically tested. The OEM partner receives sample units along with full calibration documentation for internal evaluation. This evaluation phase typically takes 2–4 weeks.",
      "Upon sample approval, production planning begins. Our facility maintains injection molding, precision machining, clean-room assembly, and gravimetric testing lines under one roof, which eliminates supply chain delays between production stages. Standard OEM lead times range from 6–10 weeks for initial orders and 4–6 weeks for repeat orders, depending on volume and complexity.",
      "Quality certification is non-negotiable. Every OEM micropipette undergoes the same ISO 8655 gravimetric testing protocol as our proprietary brands. Each unit receives a serial number and individual calibration certificate. Bulk orders include batch-level statistical documentation (accuracy, precision, Cpk values) in addition to individual certificates.",
      "Packaging and logistics can be customized extensively. Options include OEM-branded retail packaging, institutional bulk packaging, custom carousel or stand configurations, branded tip compatibility inserts, and multi-language instruction manuals. We ship directly to the OEM partner's distribution network or can coordinate container-level export to international warehousing partners.",
      "Minimum order quantities vary by product type. Single-channel variable volume micropipettes start at 100 units per SKU. Multichannel instruments start at 50 units per SKU. Contact our OEM sales engineering team with your specifications for a detailed proposal.",
    ],
    category: "Industry Insights",
    tags: [
      "OEM Manufacturing",
      "Private Label",
      "B2B Supply",
      "Custom Branding",
    ],
    author: {
      name: "Business Development Desk",
      role: "OEM & Export Division",
    },
    publishedDate: "2026-07-22",
    readingTime: "7 min read",
    featured: true,
  },
  {
    id: "pipette-tip-compatibility",
    slug: "micropipette-tip-compatibility-guide",
    title:
      "Universal vs. Proprietary Micropipette Tips: Compatibility, Cost, and Performance",
    excerpt:
      "Not all tips are created equal. This guide explains how tip geometry, material composition, and cone fit affect pipetting accuracy — and why tip compatibility testing should be part of your procurement process.",
    body: [
      "Micropipette tips are often treated as a commodity, but tip selection directly impacts volumetric accuracy, precision, and reproducibility. The interaction between the tip cone geometry of the micropipette and the internal bore geometry of the tip creates the airtight seal that is fundamental to accurate air-displacement pipetting.",
      "Universal tips are designed to fit a range of micropipette brands by using standardized cone diameters. They offer cost advantages and procurement flexibility, but the seal quality can vary between brands. A universal tip that seals perfectly on one manufacturer's instrument may exhibit micro-leaks on another, introducing systematic negative bias (under-dispensing).",
      "Proprietary tips are engineered to match a specific manufacturer's cone geometry precisely. They typically provide superior seal consistency and more reproducible results, but they limit sourcing options and may carry a price premium. Some manufacturers use asymmetric cone profiles or stepped diameters that are intentionally incompatible with universal tips.",
      "When evaluating tip compatibility, consider these factors: seal integrity (the tip should seat with light, consistent finger pressure — excessive force indicates a poor geometric match), ejection force (the tip should release cleanly with the ejector mechanism without residual attachment), drip test (fill the tip to maximum volume and hold horizontally for 30 seconds — no liquid should escape from a properly sealed tip), and gravimetric verification (perform a 10-replicate gravimetric test comparing the candidate tip against the manufacturer's recommended tip at minimum, mid-range, and maximum volume settings).",
      "Material composition matters too. Standard polypropylene tips are suitable for most aqueous applications. Low-retention (hydrophobic) tips are coated or molded from modified polymers that reduce sample adhesion, improving recovery and accuracy for viscous or protein-rich samples. Filter tips incorporate a physical barrier (typically polyethylene frit) that prevents aerosol contamination of the pipette body during aspiration of volatile or biohazardous samples.",
      "For B2B procurement at scale, request tip compatibility data from both the micropipette manufacturer and the tip supplier. Reputable manufacturers will provide compatibility matrices and may offer co-validation testing for specific tip-pipette combinations.",
    ],
    category: "Application Notes",
    tags: [
      "Pipette Tips",
      "Tip Compatibility",
      "Liquid Handling",
      "Laboratory Consumables",
    ],
    author: {
      name: "Application Science Desk",
      role: "Product Engineering Division",
    },
    publishedDate: "2026-07-05",
    readingTime: "6 min read",
    featured: false,
  },
  {
    id: "labxe-precision-series-launch",
    slug: "labxe-precision-series-2026-launch",
    title:
      "Introducing the LABXE Precision Series 2026: Next-Generation Variable Volume Micropipettes",
    excerpt:
      "The 2026 LABXE Precision Series delivers reduced plunger force, enhanced chemical resistance, and updated ergonomic design across the entire single-channel and multichannel range. Here's what's new.",
    body: [
      "We are pleased to announce the availability of the 2026 LABXE Precision Series — a comprehensive update to our flagship single-channel and multichannel variable volume micropipette lineup. This release represents over 18 months of engineering refinement based on direct feedback from laboratory partners, distributors, and OEM customers across 40+ countries.",
      "The headline improvement is a 30% reduction in plunger actuation force compared to the previous generation. This was achieved through a redesigned spring mechanism that uses a variable-rate compression spring with a longer travel path, distributing force more evenly through the dispensing stroke. The result is noticeably smoother operation and reduced operator fatigue during extended pipetting sessions.",
      "Chemical resistance has been upgraded across the product line. All wetted components — pistons, seals, and shaft assemblies — now use medical-grade PVDF (polyvinylidene fluoride) as the standard material, replacing the PTFE/PP combination used in the previous generation. PVDF offers superior resistance to organic solvents, concentrated acids, and oxidizing agents while maintaining the dimensional stability required for gravimetric accuracy.",
      "The updated ergonomic housing features a contoured finger rest with a soft-touch overmold, a textured thumb grip for secure handling during vertical pipetting, and a repositioned volume display window angled at 15° for improved readability. The overall weight has been reduced by 8% through internal structural optimization.",
      "For multichannel models, the 2026 update introduces an improved tip alignment mechanism that ensures uniform tip-to-tip sealing pressure across all channels. This directly reduces inter-channel CV, which is critical for high-throughput microplate applications. The 360° manifold rotation has been retained and now features a detent mechanism for 90° snap positioning.",
      "All 2026 Precision Series micropipettes ship with individual gravimetric calibration certificates, a QR-coded serial number linked to digital calibration records, and are compatible with the existing LABXE universal tip range. Upgrade pricing and trade-in programs are available for existing LABXE customers through authorized distributors.",
    ],
    category: "Product Updates",
    tags: ["LABXE", "Product Launch", "Micropipettes", "2026 Series"],
    author: {
      name: "Product Marketing Team",
      role: "LABXE Brand Division",
    },
    publishedDate: "2026-06-18",
    readingTime: "5 min read",
    featured: false,
  },
  {
    id: "export-compliance-lab-equipment",
    slug: "exporting-laboratory-equipment-compliance-guide",
    title:
      "Exporting Laboratory Equipment: Regulatory Compliance and Documentation for Global Markets",
    excerpt:
      "A practical overview of export documentation, regulatory certifications, and country-specific requirements that B2B buyers and distributors should understand when sourcing laboratory instruments internationally.",
    body: [
      "International trade in laboratory instruments involves a complex web of regulatory requirements, documentation standards, and country-specific certifications. For B2B buyers, distributors, and institutional procurement teams sourcing micropipettes and liquid handling equipment from manufacturing partners, understanding these requirements upfront prevents costly delays and customs complications.",
      "At the manufacturing level, the baseline certifications for laboratory micropipettes include ISO 8655 compliance (gravimetric testing), ISO 9001:2015 quality management system certification for the manufacturing facility, and CE marking for European Union market access. Additional certifications may include FDA registration (for clinical diagnostic use in the United States), UKCA marking (for the United Kingdom post-Brexit), and country-specific medical device registrations where applicable.",
      "Export documentation requirements vary by destination country but typically include: commercial invoice with HS (Harmonized System) tariff classification code, packing list with individual serial numbers, certificate of origin (preferably issued by a recognized chamber of commerce), calibration certificates for each serialized unit, and material safety documentation if the shipment includes chemicals or biological reagents.",
      "For distributors establishing new import channels, we recommend conducting a pre-shipment documentation review with your customs broker. Provide them with the product datasheets, HS classification, and destination country regulatory requirements. This review typically identifies any gaps in certification or documentation before the shipment is committed, avoiding costly holds at port.",
      "Our export logistics team handles documentation preparation, regulatory certification coordination, and can arrange direct container shipping to international distribution hubs. Contact our export desk for destination-specific guidance and a compliance documentation checklist tailored to your market.",
    ],
    category: "Industry Insights",
    tags: [
      "Export Compliance",
      "Regulatory",
      "B2B Trade",
      "International Distribution",
    ],
    author: {
      name: "Export Compliance Desk",
      role: "International Trade Division",
    },
    publishedDate: "2026-06-02",
    readingTime: "5 min read",
    featured: false,
  },
  {
    id: "micropipette-calibration-drift",
    slug: "understanding-micropipette-calibration-drift",
    title:
      "Understanding Micropipette Calibration Drift: Causes, Detection, and Prevention",
    excerpt:
      "Why micropipettes lose accuracy over time, how to detect calibration drift before it affects your data, and practical strategies for maintaining volumetric integrity across your laboratory's pipette fleet.",
    body: [
      "Calibration drift — the gradual deviation of a micropipette's dispensed volume from its set point — is an inevitable consequence of mechanical wear, environmental exposure, and operational stress. Understanding the mechanisms, detection methods, and prevention strategies is essential for maintaining data integrity in regulated and research laboratories.",
      "The primary mechanical cause of calibration drift is wear on the piston seal. The piston moves through a cylindrical barrel with each aspiration and dispensing cycle, and the seal (typically an O-ring or lip seal made of PTFE, PVDF, or fluoroelastomer) gradually loses its dimensional precision. This results in an imperfect air-tight seal, causing the pipette to under-dispense (negative systematic error). Seal wear accelerates with aggressive chemical exposure, high-temperature autoclaving, and dry or dusty operating environments.",
      "Spring fatigue is the second major contributor. The return spring that drives the piston back to its resting position loses restoring force over time, particularly in instruments subjected to rapid, high-frequency pipetting. This manifests as increased plunger travel (felt as a 'softer' plunger action) and reduced aspiration volume.",
      "Environmental factors — particularly temperature and humidity — affect both the instrument and the calibration measurement. A micropipette calibrated at 20 °C and used at 25 °C will systematically over-dispense due to the thermal expansion of the air cushion in air-displacement designs. Similarly, low humidity increases evaporation losses during gravimetric testing, which can mask or exaggerate apparent drift.",
      "Detection requires regular gravimetric verification. Establish a verification schedule based on usage intensity: daily for high-volume clinical and production pipetting, weekly for standard research workflows, and monthly for low-use instruments. Use a minimum of 10 replicate measurements at the instrument's nominal volume and compare the mean and CV% against the ISO 8655 maximum permissible errors.",
      "Prevention strategies include: maintaining a consistent operating environment; following manufacturer-recommended maintenance and lubrication intervals; rotating pipettes across operators to distribute wear evenly; avoiding unnecessary autoclaving; storing pipettes vertically on carousel stands (never laying them flat); and scheduling preventive recalibration at 6–12 month intervals depending on use intensity.",
    ],
    category: "Technical Guides",
    tags: [
      "Calibration",
      "Quality Control",
      "Maintenance",
      "ISO 8655",
      "Metrology",
    ],
    author: {
      name: "Calibration Services Team",
      role: "Metrology & Quality Division",
    },
    publishedDate: "2026-05-14",
    readingTime: "7 min read",
    featured: false,
  },
];

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.featured);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3,
): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  return BLOG_POSTS.filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aShared = a.tags.filter((t) => current.tags.includes(t)).length;
      const bShared = b.tags.filter((t) => current.tags.includes(t)).length;
      return bShared - aShared;
    })
    .slice(0, limit);
}
