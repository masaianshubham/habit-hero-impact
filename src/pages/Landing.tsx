
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Track Your <span className="text-green-600">Eco-Friendly</span> Habits
            </h1>
            <p className="text-xl text-muted-foreground">
              See your environmental impact, earn rewards, and join a community making a difference for our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="eco-gradient" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/community">View Community Impact</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0 md:ml-8 animate-float">
            <div className="w-full h-72 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="text-6xl">🌱</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-green-50 dark:bg-green-900/20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How GreenSteps Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="eco-card p-6">
              <div className="w-12 h-12 rounded-full eco-gradient mb-4 flex items-center justify-center text-white">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Log Daily Actions</h3>
              <p className="text-muted-foreground">
                Record your eco-friendly habits each day, from carpooling to skipping meat.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="eco-card p-6">
              <div className="w-12 h-12 rounded-full eco-gradient mb-4 flex items-center justify-center text-white">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Track Your Impact</h3>
              <p className="text-muted-foreground">
                See how your actions reduce carbon emissions with easy-to-read charts.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="eco-card p-6">
              <div className="w-12 h-12 rounded-full eco-gradient mb-4 flex items-center justify-center text-white">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Badges</h3>
              <p className="text-muted-foreground">
                Maintain streaks and reach milestones to collect achievement badges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 container text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Movement</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Every small action adds up to make a big difference. Start your eco-friendly journey today.
        </p>
        <Button size="lg" className="eco-gradient" asChild>
          <Link to="/signup">Create Your Account</Link>
        </Button>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} GreenSteps – Eco-Habit Logger & Impact Tracker
          </p>
        </div>
      </footer>
    </div>
  );
}
