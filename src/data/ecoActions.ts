
import { EcoAction } from "@/types";

export const ecoActions: EcoAction[] = [
  {
    id: "carpooling",
    name: "Carpooling",
    points: 5,
    icon: "car",
    description: "Share rides with others to reduce carbon emissions from multiple vehicles."
  },
  {
    id: "reused-container",
    name: "Reused Container",
    points: 3,
    icon: "recycle",
    description: "Use reusable containers instead of single-use plastic or styrofoam."
  },
  {
    id: "skipped-meat",
    name: "Skipped Meat",
    points: 4,
    icon: "calendar",
    description: "Choose plant-based meals to reduce carbon footprint from meat production."
  },
  {
    id: "public-transport",
    name: "Used Public Transport",
    points: 5,
    icon: "bus",
    description: "Take buses, trains or other public transportation instead of driving alone."
  },
  {
    id: "no-plastic",
    name: "No-Plastic Day",
    points: 6,
    icon: "trash",
    description: "Avoid using any single-use plastic items for the entire day."
  },
  {
    id: "other",
    name: "Other Eco Action",
    points: 2,
    icon: "plus",
    description: "Log other eco-friendly actions you've taken today."
  }
];
