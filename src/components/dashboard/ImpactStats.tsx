
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { UserStats } from "@/types";

export default function ImpactStats() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!currentUser) return;

    const fetchUserStats = async () => {
      try {
        const q = query(
          collection(db, "userStats"),
          where("userId", "==", currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setStats(querySnapshot.docs[0].data() as UserStats);
        } else {
          // Create default stats if not found
          setStats({
            userId: currentUser.uid,
            totalPoints: 0,
            totalCarbonSaved: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalActions: 0,
            badges: []
          });
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 bg-muted rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-6">
      {/* Total Points Card */}
      <Card className="eco-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Eco-Points</CardTitle>
          <CardDescription>Your environmental impact score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-primary">
              {stats?.totalPoints || 0}
            </span>
            <span className="text-muted-foreground">points</span>
          </div>
          <div className="mt-4">
            <Progress value={Math.min((stats?.totalPoints || 0) / 2, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.totalPoints && stats.totalPoints >= 200 
                ? "Amazing impact!" 
                : "Keep going for bigger impact"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Carbon Saved Card */}
      <Card className="eco-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Carbon Saved</CardTitle>
          <CardDescription>Estimated CO₂ reduction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-primary">
              {stats?.totalCarbonSaved || 0}
            </span>
            <span className="text-muted-foreground">kg CO₂</span>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            That's equivalent to{" "}
            <span className="font-medium text-foreground">
              {Math.round(((stats?.totalCarbonSaved || 0) * 4) / 1000)}
            </span>{" "}
            trees planted
          </p>
        </CardContent>
      </Card>

      {/* Current Streak Card */}
      <Card className="eco-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Current Streak</CardTitle>
          <CardDescription>Consecutive days with actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-primary">
              {stats?.currentStreak || 0}
            </span>
            <span className="text-muted-foreground">days</span>
          </div>
          <div className="mt-4 flex items-center gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < (stats?.currentStreak || 0) % 7 ? "bg-primary" : "bg-secondary"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats?.currentStreak === stats?.longestStreak 
              ? "This is your best streak!" 
              : `Best: ${stats?.longestStreak || 0} days`}
          </p>
        </CardContent>
      </Card>

      {/* Total Actions Card */}
      <Card className="eco-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Actions</CardTitle>
          <CardDescription>Eco-friendly habits logged</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <span className="text-4xl font-bold text-primary">
              {stats?.totalActions || 0}
            </span>
            <span className="text-muted-foreground">actions</span>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            {stats?.totalActions && stats.totalActions >= 100
              ? "You're a true eco-warrior!"
              : "Every action counts!"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
