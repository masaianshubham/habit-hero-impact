
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import EcoActionsList from "@/components/habits/EcoActionsList";
import ImpactStats from "@/components/dashboard/ImpactStats";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();
  
  // Get user's first name
  const firstName = currentUser?.displayName 
    ? currentUser.displayName.split(' ')[0] 
    : 'Eco Hero';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {firstName}!
        </h1>
        <p className="text-muted-foreground mb-6">
          Track your eco-friendly habits and see your environmental impact.
        </p>
        
        {/* Dashboard Stats */}
        <ImpactStats />
        
        {/* Weekly Chart */}
        <WeeklyChart />
        
        {/* Daily Actions */}
        <Card className="eco-card mt-8">
          <CardHeader>
            <CardTitle>Today's Eco Actions</CardTitle>
            <CardDescription>
              Log your eco-friendly actions for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EcoActionsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
