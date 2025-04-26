
import Header from "@/components/layout/Header";
import BadgeGrid from "@/components/badges/BadgeGrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Badges() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Your Eco-Badges</h1>
        <p className="text-muted-foreground mb-6">
          Earn badges by maintaining streaks and completing eco-friendly actions
        </p>

        <Card className="eco-card">
          <CardHeader>
            <CardTitle>Achievement Collection</CardTitle>
            <CardDescription>
              Unlock all badges to become an ultimate eco-champion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BadgeGrid />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
