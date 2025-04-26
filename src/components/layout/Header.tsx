
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="border-b bg-background">
      <div className="container flex justify-between items-center h-16">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">
            <span className="text-green-600">Green</span>Steps
          </h1>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            {currentUser ? (
              <>
                <li>
                  <Button variant="link" onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate("/badges")}>
                    Badges
                  </Button>
                </li>
                <li>
                  <Button variant="link" onClick={() => navigate("/community")}>
                    Community
                  </Button>
                </li>
                <li>
                  <Button variant="outline" onClick={handleLogout}>
                    Log Out
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Button variant="link" onClick={() => navigate("/login")}>
                    Log In
                  </Button>
                </li>
                <li>
                  <Button 
                    className="eco-gradient"
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
