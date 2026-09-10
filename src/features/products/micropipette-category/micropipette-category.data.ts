// Source of truth: "Micropipette Category.html" (Phase 3, exact design
// system v13, confirmed by the project owner for this migration).
// Category descriptions and featured product fields below are placeholder
// text, copied verbatim from the confirmed prototype pending verified
// business data.

export type CategoryVisual =
  | { kind: "multi-pipette"; count: 2 | 4 }
  | { kind: "single-pipette"; rotateDeg: number; scale: number }
  | { kind: "controller" };

export interface MicropipetteCategoryItem {
  id: string;
  title: string;
  tag: string;
  visual: CategoryVisual;
  /** Verbatim placeholder from the confirmed prototype; not yet verified. */
  description: string;
  /**
   * Intended future subcategory route. Only "variable-volume" corresponds to
   * a LOCKED prototype today ("Variable Volume Subcategory"); the rest are
   * safe typed placeholders following the same route convention pending
   * their own approved prototypes/routes (see migration report).
   */
  href: string;
}

const PLACEHOLDER_DESCRIPTION = "[Verified category description]";

export const micropipetteCategoryItems: readonly MicropipetteCategoryItem[] = [
  {
    id: "variable-volume",
    title: "Variable Volume",
    tag: "Micropipettes",
    visual: { kind: "multi-pipette", count: 2 },
    description: PLACEHOLDER_DESCRIPTION,
    href: "/products/micropipettes/variable-volume",
  },
  {
    id: "fixed-volume",
    title: "Fixed Volume",
    tag: "Micropipettes",
    visual: { kind: "single-pipette", rotateDeg: 8, scale: 0.88 },
    description: PLACEHOLDER_DESCRIPTION,
    href: "/products/micropipettes/fixed-volume",
  },
  {
    id: "single-channel",
    title: "Single Channel",
    tag: "Channel Type",
    visual: { kind: "single-pipette", rotateDeg: 16, scale: 0.9 },
    description: PLACEHOLDER_DESCRIPTION,
    href: "/products/micropipettes/single-channel",
  },
  {
    id: "multichannel",
    title: "Multichannel",
    tag: "Channel Type",
    visual: { kind: "multi-pipette", count: 4 },
    description: PLACEHOLDER_DESCRIPTION,
    href: "/products/micropipettes/multichannel",
  },
  {
    id: "electronic",
    title: "Electronic",
    tag: "Operation",
    visual: { kind: "controller" },
    description: PLACEHOLDER_DESCRIPTION,
    href: "/products/micropipettes/electronic",
  },
  {
    id: "mechanical",
    title: "Mechanical",
    tag: "Operation",
    visual: { kind: "single-pipette", rotateDeg: -10, scale: 0.9 },
    description: PLACEHOLDER_DESCRIPTION,
    href: "/products/micropipettes/mechanical",
  },
];

export interface FeaturedMicropipetteItem {
  id: string;
  /** Intended Product Detail route segment; that page is not migrated yet. */
  slug: string;
  brandLabel: string;
  typeLabel: string;
  title: string;
  description: string;
  specs: readonly string[];
  meta: string;
}

// The confirmed prototype renders four identical placeholder featured
// cards; only the id/slug differ so each has a stable React key and CTA
// target.
const PLACEHOLDER_FEATURED_CARD = {
  brandLabel: "[BRAND]",
  typeLabel: "[TYPE]",
  title: "[PRODUCT NAME / MODEL]",
  description: "[Verified short product description]",
  specs: ["[VERIFIED SPEC]", "[VERIFIED SPEC]"],
  meta: "[CATEGORY]",
} as const;

export const featuredMicropipetteItems: readonly FeaturedMicropipetteItem[] =
  Array.from({ length: 4 }, (_, index) => ({
    id: `featured-micropipette-${index + 1}`,
    slug: `featured-micropipette-${index + 1}`,
    ...PLACEHOLDER_FEATURED_CARD,
  }));
