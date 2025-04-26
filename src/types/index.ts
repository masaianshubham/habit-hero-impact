
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

export interface EcoAction {
  id: string;
  name: string;
  points: number;
  icon: string;
  description: string;
}

export interface EcoLog {
  id: string;
  userId: string;
  actionId: string;
  actionName: string;
  points: number;
  date: string; // ISO string format
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  requirement: {
    type: "streak" | "totalActions" | "specificAction";
    count: number;
    actionId?: string;
  };
}

export interface UserStats {
  userId: string;
  totalPoints: number;
  totalCarbonSaved: number;
  currentStreak: number;
  longestStreak: number;
  totalActions: number;
  lastActionDate?: string;
  badges: string[]; // Array of badge IDs
}

export interface GlobalStats {
  totalUsers: number;
  totalPoints: number;
  totalCarbonSaved: number;
  totalActions: number;
}
