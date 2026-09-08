export type ProductCategory = {
  id: string;
  title: string;
  description: string;
  visualType:
    "micropipette" | "tips" | "rack" | "controller" | "stand" | "balance";
};

export const productCategories: readonly ProductCategory[] = [
  {
    id: "micropipettes",
    title: "Micropipettes",
    description: "Single, multichannel & specialty",
    visualType: "micropipette",
  },
  {
    id: "pipette-tips",
    title: "Pipette Tips",
    description: "Universal fit tips",
    visualType: "tips",
  },
  {
    id: "tip-boxes-racks",
    title: "Tip Boxes & Racks",
    description: "Storage & organization",
    visualType: "rack",
  },
  {
    id: "pipette-controllers",
    title: "Pipette Controllers",
    description: "Ergonomic & efficient",
    visualType: "controller",
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Stands, tools & more",
    visualType: "stand",
  },
  {
    id: "lab-instruments",
    title: "Lab Instruments",
    description: "Balances & more",
    visualType: "balance",
  },
];
