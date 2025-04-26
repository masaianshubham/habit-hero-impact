
import { Badge } from "@/types";

export const badges: Badge[] = [
  {
    id: "seven-day-streak",
    name: "Week Warrior",
    description: "Maintain a 7-day streak of eco-friendly actions",
    imageUrl: "/badges/streak-7.svg",
    requirement: {
      type: "streak",
      count: 7
    }
  },
  {
    id: "thirty-day-streak",
    name: "Eco Champion",
    description: "Maintain a 30-day streak of eco-friendly actions",
    imageUrl: "/badges/streak-30.svg",
    requirement: {
      type: "streak",
      count: 30
    }
  },
  {
    id: "fifty-actions",
    name: "Green Guardian",
    description: "Complete 50 eco-friendly actions",
    imageUrl: "/badges/actions-50.svg",
    requirement: {
      type: "totalActions",
      count: 50
    }
  },
  {
    id: "hundred-actions",
    name: "Earth Superhero",
    description: "Complete 100 eco-friendly actions",
    imageUrl: "/badges/actions-100.svg",
    requirement: {
      type: "totalActions",
      count: 100
    }
  },
  {
    id: "transport-master",
    name: "Transport Master",
    description: "Use public transport 10 times",
    imageUrl: "/badges/transport.svg",
    requirement: {
      type: "specificAction",
      count: 10,
      actionId: "public-transport"
    }
  },
  {
    id: "plant-power",
    name: "Plant Power",
    description: "Skip meat 10 times",
    imageUrl: "/badges/plant.svg",
    requirement: {
      type: "specificAction",
      count: 10,
      actionId: "skipped-meat"
    }
  }
];
