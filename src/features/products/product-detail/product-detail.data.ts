// Source of truth: "MicropipetteManufacturer_Phase3_Product_Detail_v1(1).html"
// Technical specifications and product descriptions follow project claim discipline.

export interface ProductDetailSpec {
  label: string;
  value: string;
}

export interface ProductDetailFeature {
  num: string;
  title: string;
  desc: string;
}

export interface ProductDetailDownload {
  title: string;
  format: string;
  size: string;
}

export interface ProductDetailItem {
  id: string;
  slug: string;
  title: string;
  brand: "SSCIENCES" | "LABXE" | "DANWER";
  typeLabel: string;
  shortOverview: string;
  productCode: string;
  category: string;
  keySpecs: {
    volumeRange: string;
    increment: string;
    channel: string;
    autoclavable: string;
  };
  longOverview: string[];
  specifications: ProductDetailSpec[];
  features: ProductDetailFeature[];
  applications: string[];
  downloads: ProductDetailDownload[];
  relatedSlugs: string[];
}

export const productCatalog: Record<string, ProductDetailItem> = {
  "ssciences-science-plus-variable-05-10": {
    id: "ssciences-science-plus-variable-05-10",
    slug: "ssciences-science-plus-variable-05-10",
    title: "Science Plus Variable Volume Micropipette (0.5–10 µL)",
    brand: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    shortOverview:
      "Precision single-channel variable volume pipette featuring ergonomic finger rest, smooth click-stop volume adjustment, and separate tip ejector for effortless daily routine pipetting.",
    productCode: "SP-V010",
    category: "Micropipette",
    keySpecs: {
      volumeRange: "0.5 – 10 µL",
      increment: "0.1 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Assembly",
    },
    longOverview: [
      "The SSCIENCES Science Plus series represents an optimal balance between precision mechanical engineering and user comfort. Fabricated with high-grade PVDF and chemical-resistant polymers, it ensures thermal insulation to prevent hand heat transfer during prolonged pipetting.",
      "A dual-step plunger stroke enables reverse pipetting for viscous liquids, while the autoclavable lower section ensures rapid steam decontamination between sensitive assays.",
    ],
    specifications: [
      { label: "Volume Range", value: "0.5 – 10 µL" },
      { label: "Increment", value: "0.1 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±1.00%" },
      { label: "Imprecision (Max Vol)", value: "≤0.50%" },
      { label: "Channel Configuration", value: "Single Channel" },
      { label: "Tip Compatibility", value: "Universal 10 µL tips" },
      { label: "Autoclavability", value: "121°C (Lower assembly)" },
      {
        label: "Construction Material",
        value: "Chemical-resistant PVDF & stainless steel",
      },
    ],
    features: [
      {
        num: "01",
        title: "Click-Stop Volume Dial",
        desc: "Secure locking mechanism prevents accidental volume drift during continuous pipetting series.",
      },
      {
        num: "02",
        title: "Thermal Insulation Body",
        desc: "Specialized outer shell protects the inner piston chamber from hand-induced temperature expansion.",
      },
      {
        num: "03",
        title: "Streamlined Tip Ejector",
        desc: "Smooth lever action ejects tips with minimal thumb force, reducing repetitive strain fatigue.",
      },
      {
        num: "04",
        title: "Field Calibratable",
        desc: "Supplied with dedicated calibration tool enabling quick in-lab recalibration following ISO 8655 guidelines.",
      },
    ],
    applications: [
      "Molecular Biology",
      "PCR & qPCR Setup",
      "Enzyme Assays",
      "Clinical Diagnostics",
      "Microbiology",
    ],
    downloads: [
      {
        title: "Science Plus Product Datasheet",
        format: "PDF",
        size: "1.8 MB",
      },
      {
        title: "User Manual & Calibration Guide",
        format: "PDF",
        size: "3.2 MB",
      },
      {
        title: "SSCIENCES Pipette Family Catalogue",
        format: "PDF",
        size: "5.4 MB",
      },
    ],
    relatedSlugs: [
      "ssciences-science-plus-variable-10-100",
      "ssciences-fac-plus-fully-autoclavable-20-200",
      "labxe-precision-variable-100-1000",
    ],
  },
  "ssciences-science-plus-variable-10-100": {
    id: "ssciences-science-plus-variable-10-100",
    slug: "ssciences-science-plus-variable-10-100",
    title: "Science Plus Variable Volume Micropipette (10–100 µL)",
    brand: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    shortOverview:
      "Reliable mid-volume mechanical pipette engineered for high reproducibility, fatigue-free handling, and broad chemical compatibility across biological buffers.",
    productCode: "SP-V100",
    category: "Micropipette",
    keySpecs: {
      volumeRange: "10 – 100 µL",
      increment: "1.0 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Assembly",
    },
    longOverview: [
      "The 10–100 µL Science Plus model is the workhorse of clinical chemistry and biochemistry laboratories. Its precision piston rod is machined to sub-micron tolerances, ensuring exact volumetric displacement across every aspirate and dispense cycle.",
      "The lightweight body is contoured to rest naturally in either the left or right hand, minimizing grip tension during multi-hour sample handling workflows.",
    ],
    specifications: [
      { label: "Volume Range", value: "10 – 100 µL" },
      { label: "Increment", value: "1.0 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.80%" },
      { label: "Imprecision (Max Vol)", value: "≤0.20%" },
      { label: "Channel Configuration", value: "Single Channel" },
      { label: "Tip Compatibility", value: "Universal 200 µL / 300 µL tips" },
      { label: "Autoclavability", value: "121°C (Lower assembly)" },
      {
        label: "Construction Material",
        value: "Reinforced fluoropolymer & stainless core",
      },
    ],
    features: [
      {
        num: "01",
        title: "Ultra-Low Operating Force",
        desc: "Soft plunger stroke significantly reduces thumb strain over high-throughput analytical runs.",
      },
      {
        num: "02",
        title: "Clear 4-Digit Display",
        desc: "High-contrast internal volume counter clearly visible from multiple viewing angles.",
      },
      {
        num: "03",
        title: "Chemical Shielding",
        desc: "Internal O-rings and seals made from premium elastomeric compounds resist organic solvent vapors.",
      },
      {
        num: "04",
        title: "Tool-Free Disassembly",
        desc: "Lower barrel unscrews in seconds for routine cleaning, decontamination, and seal inspection.",
      },
    ],
    applications: [
      "Biochemistry",
      "Protein Purification",
      "ELISA Testing",
      "Cell Biology",
      "General Analytical Prep",
    ],
    downloads: [
      {
        title: "Science Plus Product Datasheet",
        format: "PDF",
        size: "1.8 MB",
      },
      {
        title: "User Manual & Calibration Guide",
        format: "PDF",
        size: "3.2 MB",
      },
      {
        title: "SSCIENCES Pipette Family Catalogue",
        format: "PDF",
        size: "5.4 MB",
      },
    ],
    relatedSlugs: [
      "ssciences-science-plus-variable-05-10",
      "ssciences-fac-plus-fully-autoclavable-20-200",
      "labxe-precision-variable-100-1000",
    ],
  },
  "ssciences-fac-plus-fully-autoclavable-20-200": {
    id: "ssciences-fac-plus-fully-autoclavable-20-200",
    slug: "ssciences-fac-plus-fully-autoclavable-20-200",
    title: "FAC Plus Fully Autoclavable Micropipette (20–200 µL)",
    brand: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    shortOverview:
      "Fully autoclavable mechanical pipette designed for critical contamination control. Steam sterilizable at 121°C without disassembly or loss of volumetric calibration.",
    productCode: "FAC-V200",
    category: "Micropipette",
    keySpecs: {
      volumeRange: "20 – 200 µL",
      increment: "1.0 µL",
      channel: "Single Channel",
      autoclavable: "121°C Fully Autoclavable",
    },
    longOverview: [
      "Engineered specifically for molecular laboratories, sterile pharmaceutical filling, and tissue culture where cross-contamination is impermissible. The entire instrument can be placed directly into an autoclave chamber at 121°C (1 bar) for 20 minutes.",
      "Advanced thermoset internal components ensure that repeated thermal sterilization cycles do not alter spring tension or piston seating tolerances.",
    ],
    specifications: [
      { label: "Volume Range", value: "20 – 200 µL" },
      { label: "Increment", value: "1.0 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.60%" },
      { label: "Imprecision (Max Vol)", value: "≤0.20%" },
      { label: "Channel Configuration", value: "Single Channel" },
      { label: "Tip Compatibility", value: "Universal 200 µL tips" },
      { label: "Autoclavability", value: "121°C (Entire pipette body)" },
      {
        label: "Construction Material",
        value: "High-grade autoclavable engineering polymers",
      },
    ],
    features: [
      {
        num: "01",
        title: "100% Autoclavable Design",
        desc: "Complete steam sterilization without disassembling, recalibrating, or greasing components.",
      },
      {
        num: "02",
        title: "Enhanced UV Resistance",
        desc: "Outer casing resists degradation from prolonged exposure in laminar flow UV decontaminating hoods.",
      },
      {
        num: "03",
        title: "Universal Tip Fit",
        desc: "Beveled tip cone provides airtight seal with all standard universal laboratory tips.",
      },
      {
        num: "04",
        title: "Double O-Ring Sealing",
        desc: "Superior seal integrity maintains vacuum stability and prevents sample aerosol penetration.",
      },
    ],
    applications: [
      "Tissue Culture",
      "Sterile Drug Formulation",
      "Genomics & Sequencing",
      "Forensics",
      "Biohazard Level Labs",
    ],
    downloads: [
      { title: "FAC Plus Product Datasheet", format: "PDF", size: "2.1 MB" },
      { title: "Autoclaving Protocol Guide", format: "PDF", size: "1.4 MB" },
      {
        title: "SSCIENCES Pipette Family Catalogue",
        format: "PDF",
        size: "5.4 MB",
      },
    ],
    relatedSlugs: [
      "ssciences-science-plus-variable-10-100",
      "labxe-precision-variable-100-1000",
      "ssciences-multichannel-8ch-variable-20-200",
    ],
  },
  "labxe-precision-variable-100-1000": {
    id: "labxe-precision-variable-100-1000",
    slug: "labxe-precision-variable-100-1000",
    title: "LABXE Precision Series Variable Volume (100–1000 µL)",
    brand: "LABXE",
    typeLabel: "VARIABLE VOLUME",
    shortOverview:
      "Heavy-duty milliliter-class variable pipette crafted from in-house precision injection molds with high-density polymer construction for high chemical resistance.",
    productCode: "LX-P1000",
    category: "Micropipette",
    keySpecs: {
      volumeRange: "100 – 1000 µL",
      increment: "5.0 µL",
      channel: "Single Channel",
      autoclavable: "Fully Autoclavable",
    },
    longOverview: [
      "LABXE Precision Series is designed for demanding industrial, academic, and hospital testing environments requiring rugged durability and consistent delivery of larger microliter volumes.",
      "Incorporating an oversized digit window and an integrated piston damping shock absorber, it delivers smooth dispense action even when aspirating viscous or dense aqueous matrices.",
    ],
    specifications: [
      { label: "Volume Range", value: "100 – 1000 µL" },
      { label: "Increment", value: "5.0 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.60%" },
      { label: "Imprecision (Max Vol)", value: "≤0.20%" },
      { label: "Channel Configuration", value: "Single Channel" },
      { label: "Tip Compatibility", value: "Universal 1000 µL tips" },
      { label: "Autoclavability", value: "121°C Autoclavable" },
      {
        label: "Construction Material",
        value: "High-impact polymer & corrosion-proof alloy",
      },
    ],
    features: [
      {
        num: "01",
        title: "In-House Molded Barrel",
        desc: "Micro-machined barrel ensures optimal air displacement consistency across the entire 1000 µL stroke.",
      },
      {
        num: "02",
        title: "Shock-Absorbing Piston",
        desc: "Dampened plunger travel prevents liquid splash and bubble formation during rapid dispensing.",
      },
      {
        num: "03",
        title: "High Chemical Resistance",
        desc: "Specially formulated housing withstands accidental contact with acids, bases, and organic solvents.",
      },
      {
        num: "04",
        title: "Calibration Certificate Included",
        desc: "Individually calibrated and supplied with ISO 8655 gravimetric test report from our calibration lab.",
      },
    ],
    applications: [
      "Environmental Testing",
      "Food & Beverage QC",
      "Pharmaceutical Analysis",
      "Organic Chemistry Prep",
      "Water Quality Labs",
    ],
    downloads: [
      {
        title: "LABXE Precision Series Datasheet",
        format: "PDF",
        size: "1.9 MB",
      },
      {
        title: "LABXE Laboratory Equipment Catalogue",
        format: "PDF",
        size: "6.2 MB",
      },
      { title: "Chemical Compatibility Chart", format: "PDF", size: "1.1 MB" },
    ],
    relatedSlugs: [
      "ssciences-science-plus-variable-10-100",
      "ssciences-fac-plus-fully-autoclavable-20-200",
      "ssciences-science-plus-macro-1-10ml",
    ],
  },
  "ssciences-multichannel-8ch-variable-20-200": {
    id: "ssciences-multichannel-8ch-variable-20-200",
    slug: "ssciences-multichannel-8ch-variable-20-200",
    title: "SSCIENCES 8-Channel Variable Micropipette (20–200 µL)",
    brand: "SSCIENCES",
    typeLabel: "MULTICHANNEL",
    shortOverview:
      "Ergonomic 8-channel pipette equipped with a 360° rotating manifold, individual piston assemblies, and uniform tip sealing for 96-well microplate workflows.",
    productCode: "MC-8-200",
    category: "Multichannel Micropipette",
    keySpecs: {
      volumeRange: "20 – 200 µL",
      increment: "1.0 µL",
      channel: "8-Channel",
      autoclavable: "Autoclavable Manifold",
    },
    longOverview: [
      "Accelerate microplate liquid dispensing with the SSCIENCES 8-Channel Variable Micropipette. Designed specifically for high-throughput screening, ELISA assays, and cell culture plate filling.",
      "The lightweight manifold rotates 360 degrees for effortless right- or left-hand positioning. Individual piston/tip cone modules ensure that maintenance and calibration can be conducted channel by channel.",
    ],
    specifications: [
      { label: "Volume Range", value: "20 – 200 µL" },
      { label: "Increment", value: "1.0 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.80%" },
      { label: "Imprecision (Max Vol)", value: "≤0.30%" },
      { label: "Channel Configuration", value: "8-Channel" },
      {
        label: "Tip Compatibility",
        value: "Universal 200 µL / 300 µL multichannel tips",
      },
      { label: "Autoclavability", value: "121°C Autoclavable Manifold" },
      {
        label: "Construction Material",
        value: "Lightweight composite & stainless manifold",
      },
    ],
    features: [
      {
        num: "01",
        title: "360° Rotatable Manifold",
        desc: "Adjust the orientation of the tip cones to comfortably fit 96-well plate angle preferences.",
      },
      {
        num: "02",
        title: "Even Liquid Distribution",
        desc: "Individual calibrated pistons guarantee channel-to-channel reproducibility below 0.5% CV.",
      },
      {
        num: "03",
        title: "Low Force Tip Ejection",
        desc: "Curved ejector bar releases all 8 tips sequentially, reducing the required ejection pressure by 50%.",
      },
      {
        num: "04",
        title: "Individual Tip Cones",
        desc: "Removable independent cone assemblies allow single-cone replacement without scrapping the entire manifold.",
      },
    ],
    applications: [
      "ELISA Assays",
      "High-Throughput Screening",
      "96-Well Microplate Prep",
      "Drug Discovery",
      "Immunology Testing",
    ],
    downloads: [
      { title: "Multichannel Series Datasheet", format: "PDF", size: "2.4 MB" },
      { title: "Microplate Pipetting Protocol", format: "PDF", size: "1.6 MB" },
      {
        title: "SSCIENCES Pipette Family Catalogue",
        format: "PDF",
        size: "5.4 MB",
      },
    ],
    relatedSlugs: [
      "labxe-multichannel-12ch-variable-10-100",
      "ssciences-fac-plus-fully-autoclavable-20-200",
      "ssciences-science-plus-variable-10-100",
    ],
  },
  "danwer-precision-electronic-variable-05-10": {
    id: "danwer-precision-electronic-variable-05-10",
    slug: "danwer-precision-electronic-variable-05-10",
    title: "DANWER Electronic Variable Controller Micropipette",
    brand: "DANWER",
    typeLabel: "ELECTRONIC",
    shortOverview:
      "Microprocessor-driven motorized electronic pipette providing automatic aspiration, multidispensing, programmable mixing modes, and zero-thumb strain operation.",
    productCode: "DW-E010",
    category: "Electronic Pipette",
    keySpecs: {
      volumeRange: "0.5 – 10 µL",
      increment: "0.01 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Tip Cone",
    },
    longOverview: [
      "The DANWER Electronic series eliminates manual pipetting variability through a precision stepper motor that controls aspiration and dispense speeds with absolute digital accuracy.",
      "Featuring a backlit LCD display and simple rocker-button control, it supports pipetting, multiple dispensing, series dilution, and automated mixing modes with up to 9 custom preset memories.",
    ],
    specifications: [
      { label: "Volume Range", value: "0.5 – 10 µL" },
      { label: "Increment", value: "0.01 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.60%" },
      { label: "Imprecision (Max Vol)", value: "≤0.15%" },
      { label: "Channel Configuration", value: "Single Channel" },
      { label: "Tip Compatibility", value: "Universal 10 µL tips" },
      { label: "Autoclavability", value: "121°C Autoclavable tip cone" },
      {
        label: "Battery / Power",
        value: "Rechargeable Li-ion with USB-C dock",
      },
    ],
    features: [
      {
        num: "01",
        title: "Motorized Stepper Drive",
        desc: "Completely eliminates user-to-user volumetric discrepancies and thumb fatigue.",
      },
      {
        num: "02",
        title: "Multi-Dispensing Mode",
        desc: "Aspirate once and dispense multiple aliquots at high speed with automatic pace adjustment.",
      },
      {
        num: "03",
        title: "High-Resolution Display",
        desc: "Monitors battery level, operating mode, speed setting, and active volume down to 0.01 µL.",
      },
      {
        num: "04",
        title: "USB-C Fast Charging",
        desc: "Operate continuously while charging or use on-board battery for over 2,000 pipetting cycles.",
      },
    ],
    applications: [
      "Next-Gen Sequencing (NGS)",
      "Automated Assays",
      "Viscous Liquid Handling",
      "Serial Dilutions",
      "Pharmacological Research",
    ],
    downloads: [
      {
        title: "DANWER Electronic Series Datasheet",
        format: "PDF",
        size: "2.8 MB",
      },
      {
        title: "Electronic Pipette User Manual",
        format: "PDF",
        size: "4.1 MB",
      },
      { title: "DANWER Instruments Catalogue", format: "PDF", size: "5.0 MB" },
    ],
    relatedSlugs: [
      "ssciences-science-plus-variable-05-10",
      "ssciences-fac-plus-fully-autoclavable-20-200",
      "labxe-precision-variable-100-1000",
    ],
  },
  "labxe-multichannel-12ch-variable-10-100": {
    id: "labxe-multichannel-12ch-variable-10-100",
    slug: "labxe-multichannel-12ch-variable-10-100",
    title: "LABXE 12-Channel Variable Volume Micropipette (10–100 µL)",
    brand: "LABXE",
    typeLabel: "MULTICHANNEL",
    shortOverview:
      "12-channel high-density laboratory instrument designed for fast row-by-row pipetting in standard 96-well and 384-well microplate configurations.",
    productCode: "LX-MC12-100",
    category: "Multichannel Micropipette",
    keySpecs: {
      volumeRange: "10 – 100 µL",
      increment: "1.0 µL",
      channel: "12-Channel",
      autoclavable: "Autoclavable Lower Section",
    },
    longOverview: [
      "Equipped with 12 precision-machined stainless pistons, this instrument enables entire 96-well plates to be loaded in just 8 operations. Its ergonomic handle design balances the additional weight of the 12-channel manifold for fatigue-free pipetting.",
      "Dual O-rings on every tip cone ensure tight, secure sealing without having to hammer the pipette onto the tip rack.",
    ],
    specifications: [
      { label: "Volume Range", value: "10 – 100 µL" },
      { label: "Increment", value: "1.0 µL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.90%" },
      { label: "Imprecision (Max Vol)", value: "≤0.35%" },
      { label: "Channel Configuration", value: "12-Channel" },
      { label: "Tip Compatibility", value: "Universal 200 µL tips" },
      { label: "Autoclavability", value: "121°C Autoclavable lower manifold" },
      {
        label: "Construction Material",
        value: "Composite manifold with stainless pistons",
      },
    ],
    features: [
      {
        num: "01",
        title: "12-Channel Rapid Loading",
        desc: "Processes 96-well plates in minutes with uniform volume delivery across every column.",
      },
      {
        num: "02",
        title: "Balanced Weight Profile",
        desc: "Low-center-of-gravity design ensures stable handhold without wrist strain.",
      },
      {
        num: "03",
        title: "Smooth Ejector Mechanism",
        desc: "Staggered ejector bar reduces the force required to release 12 tips simultaneously.",
      },
      {
        num: "04",
        title: "Complete Row Visibility",
        desc: "Slender manifold structure allows an unobstructed view of microplate wells during dispensing.",
      },
    ],
    applications: [
      "96-Well Microplate Assays",
      "High-Throughput Screening",
      "PCR Reagent Mastermixing",
      "Serology",
      "Cell Culture Media Exchange",
    ],
    downloads: [
      { title: "LABXE 12-Channel Datasheet", format: "PDF", size: "2.2 MB" },
      {
        title: "LABXE Laboratory Equipment Catalogue",
        format: "PDF",
        size: "6.2 MB",
      },
    ],
    relatedSlugs: [
      "ssciences-multichannel-8ch-variable-20-200",
      "ssciences-science-plus-variable-10-100",
      "labxe-precision-variable-100-1000",
    ],
  },
  "ssciences-science-plus-macro-1-10ml": {
    id: "ssciences-science-plus-macro-1-10ml",
    slug: "ssciences-science-plus-macro-1-10ml",
    title: "Science Plus Macro Variable Volume (1–10 mL)",
    brand: "SSCIENCES",
    typeLabel: "MACRO VOLUME",
    shortOverview:
      "High-capacity macro pipette designed for transferring large volumes with micropipette accuracy, complete with interchangeable nozzle protection filter against aerosol vapor.",
    productCode: "SP-M10ML",
    category: "Macro Micropipette",
    keySpecs: {
      volumeRange: "1 – 10 mL",
      increment: "0.1 mL",
      channel: "Single Channel",
      autoclavable: "Autoclavable Lower Part",
    },
    longOverview: [
      "The 1–10 mL Science Plus macro pipette bridges the gap between traditional graduated pipettes and micropipette accuracy. Ideal for cell culture media preparation, buffer compounding, and viscous reagent distribution.",
      "An integrated hydrophobic nozzle filter protects the interior piston from accidental over-aspiration and corrosive vapors.",
    ],
    specifications: [
      { label: "Volume Range", value: "1 – 10 mL" },
      { label: "Increment", value: "0.1 mL" },
      { label: "Inaccuracy (Max Vol)", value: "±0.60%" },
      { label: "Imprecision (Max Vol)", value: "≤0.20%" },
      { label: "Channel Configuration", value: "Single Channel" },
      { label: "Tip Compatibility", value: "Dedicated 10 mL macro tips" },
      { label: "Autoclavability", value: "121°C Lower assembly" },
      { label: "Filter Protection", value: "Exchangeable PTFE aerosol filter" },
    ],
    features: [
      {
        num: "01",
        title: "Macro Range Precision",
        desc: "Delivers milliliter-scale volumes with precision far superior to conventional serological pipettes.",
      },
      {
        num: "02",
        title: "Aerosol Protection Filter",
        desc: "Replaceable nozzle filter catches liquid droplets and protects internal chamber from corrosion.",
      },
      {
        num: "03",
        title: "Heavy-Duty Piston Rod",
        desc: "Solid stainless steel core designed to smoothly displace dense solutions and viscous matrices.",
      },
      {
        num: "04",
        title: "Autoclavable Lower Section",
        desc: "Tip cone and barrel withstand standard autoclave sterilization at 121°C.",
      },
    ],
    applications: [
      "Buffer Preparation",
      "Media Dispensing",
      "Large-Volume Aliquoting",
      "Bioreactor Sampling",
      "Viscous Liquid Handling",
    ],
    downloads: [
      { title: "Science Plus Macro Datasheet", format: "PDF", size: "1.7 MB" },
      {
        title: "User Manual & Calibration Guide",
        format: "PDF",
        size: "3.2 MB",
      },
      {
        title: "SSCIENCES Pipette Family Catalogue",
        format: "PDF",
        size: "5.4 MB",
      },
    ],
    relatedSlugs: [
      "labxe-precision-variable-100-1000",
      "ssciences-science-plus-variable-10-100",
      "ssciences-fac-plus-fully-autoclavable-20-200",
    ],
  },
};

// Fallback generator for placeholders from general product listing (e.g. placeholder-1..6, featured-micropipette-1..4)
export function getProductBySlug(slug: string): ProductDetailItem {
  if (productCatalog[slug]) {
    return productCatalog[slug];
  }

  // Generate clean default structured product for any placeholder slug
  const titleFormatted = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    id: slug,
    slug,
    title: `${titleFormatted} Precision Micropipette`,
    brand: "SSCIENCES",
    typeLabel: "VARIABLE VOLUME",
    shortOverview:
      "Precision laboratory instrument engineered for high accuracy, minimal pipetting force, and full compliance with international laboratory standards.",
    productCode: `MP-${slug.slice(0, 6).toUpperCase()}`,
    category: "Micropipette",
    keySpecs: {
      volumeRange: "0.5 – 1000 µL",
      increment: "0.1 µL",
      channel: "Single Channel",
      autoclavable: "Autoclavable",
    },
    longOverview: [
      "This precision micropipette combines lightweight ergonomics with robust mechanical durability, providing exceptional repeatability across standard and advanced laboratory protocols.",
      "Every instrument is calibrated according to ISO 8655 gravimetric standards and supplied with a factory calibration certificate.",
    ],
    specifications: [
      { label: "Volume Range", value: "Verified Laboratory Range" },
      { label: "Increment", value: "Standard Metric Interval" },
      { label: "Accuracy", value: "Within ISO 8655 Standards" },
      { label: "Precision", value: "High Reproducibility (CV < 0.5%)" },
      {
        label: "Channel Configuration",
        value: "Single Channel / Multichannel",
      },
      {
        label: "Tip Compatibility",
        value: "Universal standard laboratory tips",
      },
      { label: "Autoclavability", value: "121°C Autoclavable" },
      { label: "Construction Material", value: "Chemical-resistant polymers" },
    ],
    features: [
      {
        num: "01",
        title: "Ergonomic Handling",
        desc: "Engineered body profile minimizes thumb strain during extended analytical runs.",
      },
      {
        num: "02",
        title: "Click-Stop Calibration",
        desc: "Accurate volume indexing dial prevents accidental setting drift.",
      },
      {
        num: "03",
        title: "Streamlined Tip Ejection",
        desc: "Low-force tip release mechanism reduces repetitive hand strain.",
      },
      {
        num: "04",
        title: "Chemical Shielding",
        desc: "High-grade polymer housing resists solvent contact and buffer exposure.",
      },
    ],
    applications: [
      "Molecular Biology",
      "Clinical Chemistry",
      "Analytical Quality Control",
      "Microbiology",
    ],
    downloads: [
      { title: "Product Technical Datasheet", format: "PDF", size: "1.9 MB" },
      {
        title: "User Operation & Maintenance Manual",
        format: "PDF",
        size: "3.1 MB",
      },
      { title: "Product Family Catalogue", format: "PDF", size: "5.2 MB" },
    ],
    relatedSlugs: [
      "ssciences-science-plus-variable-05-10",
      "ssciences-science-plus-variable-10-100",
      "labxe-precision-variable-100-1000",
    ],
  };
}

export function getAllProductSlugs(): string[] {
  const catalogSlugs = Object.keys(productCatalog);
  const placeholderSlugs = Array.from(
    { length: 6 },
    (_, i) => `placeholder-${i + 1}`,
  );
  const featuredSlugs = Array.from(
    { length: 4 },
    (_, i) => `featured-micropipette-${i + 1}`,
  );
  return Array.from(
    new Set([...catalogSlugs, ...placeholderSlugs, ...featuredSlugs]),
  );
}
