export type ProductCategory = {
  id: string;
  title: string;
  description: string;
  visualType:
    | "micropipette"
    | "tips"
    | "rack"
    | "controller"
    | "stand"
    | "balance";
  href: string;
};

export const productCategories: readonly ProductCategory[] = [
  {
    id: "micropipette",
    title: "Micropipette",
    description: "Single, multichannel & specialty",
    visualType: "micropipette",
    href: "/products/micropipettes",
  },
  {
    id: "bottle-top-dispenser",
    title: "Bottle Top Dispenser",
    description: "Precision reagent dispensing",
    visualType: "stand",
    href: "/products?category=Bottle+Top+Dispenser",
  },
  {
    id: "pipette-controller",
    title: "Pipette Controller",
    description: "Ergonomic & efficient liquid handling",
    visualType: "controller",
    href: "/products?category=Pipette+Controller",
  },
  {
    id: "lab-plasticware",
    title: "Lab Plasticware",
    description: "Universal tips, racks & consumables",
    visualType: "tips",
    href: "/products?category=Lab+Plasticware",
  },
  {
    id: "lab-balances",
    title: "Lab Balances",
    description: "Precision weighing & analytical balances",
    visualType: "balance",
    href: "/products?category=Lab+Balances",
  },
  {
    id: "laboratory-instruments",
    title: "Laboratory Instruments",
    description: "Benchtop laboratory instrumentation",
    visualType: "balance",
    href: "/products?category=Laboratory+Instruments",
  },
];
