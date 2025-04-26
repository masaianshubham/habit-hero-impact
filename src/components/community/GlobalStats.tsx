
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GlobalStats as GlobalStatsType } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function GlobalStats() {
  const [stats, setStats] = useState<GlobalStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        // In a real app, there'd be an aggregation service updating global stats
        // Here we'll just fetch a mock global stats document
        const globalStatsDoc = await getDoc(doc(db, "globalStats", "stats"));
        
        if (globalStatsDoc.exists()) {
          setStats(globalStatsDoc.data() as GlobalStatsType);
        } else {
          // Create default stats if not found
          setStats({
            totalUsers: 0,
            totalPoints: 0,
            totalCarbonSaved: 0,
            totalActions: 0
          });
        }
      } catch (error) {
        console.error("Error fetching global stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalStats();
  }, []);

  // Create mock data for the pie chart
  const actionTypeData = [
    { name: "Carpooling", value: 25 },
    { name: "Reused Container", value: 30 },
    { name: "Skipped Meat", value: 15 },
    { name: "Public Transport", value: 20 },
    { name: "No-Plastic Day", value: 10 }
  ];

  const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-40 bg-muted rounded-xl"></div>
        <div className="h-[400px] bg-muted rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="eco-card">
        <CardHeader>
          <CardTitle>Community Impact</CardTitle>
          <CardDescription>
            GreenSteps users are making a real difference
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Green Heroes</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {stats?.totalUsers || 0}
            </p>
            <p className="text-xs text-muted-foreground">
              Active users
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Eco-Points</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {(stats?.totalPoints || 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Total community points
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">CO₂ Saved</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {(stats?.totalCarbonSaved || 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              kg of carbon saved
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Actions</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {(stats?.totalActions || 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">
              Eco-habits logged
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="eco-card">
        <CardHeader>
          <CardTitle>Action Breakdown</CardTitle>
          <CardDescription>
            Most popular eco-friendly habits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={actionTypeData}
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {actionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} actions`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
