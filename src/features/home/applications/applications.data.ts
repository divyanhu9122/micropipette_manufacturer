export type Application = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const applications: readonly Application[] = [
  {
    id: "research",
    title: "Research & Development",
    description: "Innovation, testing and laboratory workflows.",
    icon: "⚗",
  },
  {
    id: "clinical",
    title: "Clinical & Diagnostics",
    description: "Routine precision handling in lab practice.",
    icon: "⌬",
  },
  {
    id: "academic",
    title: "Academic & Education",
    description: "Universities, institutions and teaching labs.",
    icon: "🎓",
  },
  {
    id: "pharma",
    title: "Pharma & Biotechnology",
    description: "Validated workflows and research support.",
    icon: "🏭",
  },
  {
    id: "food-environmental",
    title: "Food & Environmental",
    description: "Analytical and sample-preparation applications.",
    icon: "☘",
  },
];
