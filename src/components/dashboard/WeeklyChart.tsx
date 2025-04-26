
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { EcoLog } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyChart() {
  const { currentUser } = useAuth();
  const [weeklyData, setWeeklyData] = useState<{day: string; points: number}[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!currentUser) return;

    const fetchWeeklyData = async () => {
      try {
        // Get data for the last 7 days
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 6);
        
        const q = query(
          collection(db, "ecoLogs"),
          where("userId", "==", currentUser.uid),
          where("date", ">=", sevenDaysAgo.toISOString())
        );
        
        const querySnapshot = await getDocs(q);
        const logs = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
          } as EcoLog;
        });

        // Create array with last 7 days
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weeklyPoints: {[key: string]: number} = {};
        
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - (6 - i));
          const dayName = daysOfWeek[date.getDay()];
          weeklyPoints[dayName] = 0;
        }
        
        // Sum points by day
        logs.forEach(log => {
          const date = new Date(log.date);
          const dayName = daysOfWeek[date.getDay()];
          weeklyPoints[dayName] = (weeklyPoints[dayName] || 0) + log.points;
        });
        
        // Convert to array for chart
        const chartData = Object.entries(weeklyPoints).map(([day, points]) => ({
          day,
          points
        }));
        
        setWeeklyData(chartData);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, [currentUser]);

  if (loading) {
    return (
      <Card className="eco-card w-full h-[400px] animate-pulse">
        <div className="h-full bg-muted"></div>
      </Card>
    );
  }

  // Calculate total points for the week
  const totalWeeklyPoints = weeklyData.reduce((sum, day) => sum + day.points, 0);

  return (
    <Card className="eco-card w-full">
      <CardHeader>
        <CardTitle>Weekly Impact</CardTitle>
        <CardDescription>
          You've earned {totalWeeklyPoints} eco-points this week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} points`, 'Points']} />
              <Bar dataKey="points" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
