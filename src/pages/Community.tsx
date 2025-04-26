
import Header from "@/components/layout/Header";
import GlobalStats from "@/components/community/GlobalStats";

export default function Community() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Community Impact</h1>
        <p className="text-muted-foreground mb-6">
          Together, we're making a difference for our planet
        </p>

        <GlobalStats />
      </div>
    </div>
  );
}
