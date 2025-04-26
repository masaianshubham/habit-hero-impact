
import { useState, useEffect } from "react";
import EcoActionCard from "./EcoActionCard";
import { ecoActions } from "@/data/ecoActions";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export default function EcoActionsList() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [loggedActions, setLoggedActions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get today's date in YYYY-MM-DD format to compare with logged actions
  const today = new Date().toISOString().split('T')[0];

  // Fetch logged actions for today
  useEffect(() => {
    if (!currentUser) return;

    const fetchLoggedActions = async () => {
      try {
        const startOfDay = new Date(today);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const q = query(
          collection(db, "ecoLogs"),
          where("userId", "==", currentUser.uid),
          where("date", ">=", startOfDay.toISOString()),
          where("date", "<=", endOfDay.toISOString())
        );
        
        const querySnapshot = await getDocs(q);
        const actionIds = querySnapshot.docs.map(doc => doc.data().actionId);
        setLoggedActions(actionIds);
      } catch (error) {
        console.error("Error fetching logged actions:", error);
        toast({
          title: "Error",
          description: "Failed to load your actions for today.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoggedActions();
  }, [currentUser, today, toast]);

  // Handle logging a new action
  const handleLogAction = async (actionId: string, notes: string) => {
    if (!currentUser) return;

    try {
      const action = ecoActions.find(a => a.id === actionId);
      if (!action) return;

      // Add to Firestore
      await addDoc(collection(db, "ecoLogs"), {
        userId: currentUser.uid,
        actionId: actionId,
        actionName: action.name,
        points: action.points,
        date: new Date().toISOString(),
        notes: notes || "",
      });

      // Update local state
      setLoggedActions(prev => [...prev, actionId]);

      toast({
        title: "Action Logged!",
        description: `You earned ${action.points} eco-points for ${action.name}.`,
      });
      
      // Update user stats (this would typically be done with a Firestore transaction or cloud function)
      // This is a simplified version
      try {
        const statsRef = collection(db, "userStats");
        const q = query(statsRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          // Create new stats doc if it doesn't exist
          await addDoc(collection(db, "userStats"), {
            userId: currentUser.uid,
            totalPoints: action.points,
            totalCarbonSaved: action.points, // 1 point = 1kg CO2 saved
            currentStreak: 1,
            longestStreak: 1,
            totalActions: 1,
            lastActionDate: new Date().toISOString(),
            badges: []
          });
        } else {
          // Update would happen here - in a real app, this would use a transaction
          // For now we're just logging
          console.log("Would update user stats");
        }
      } catch (error) {
        console.error("Error updating stats:", error);
      }
      
    } catch (error) {
      console.error("Error logging action:", error);
      toast({
        title: "Error",
        description: "Failed to log your action. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-56 bg-muted rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
      {ecoActions.map((action) => (
        <EcoActionCard
          key={action.id}
          action={action}
          onLog={handleLogAction}
          isLogged={loggedActions.includes(action.id)}
        />
      ))}
    </div>
  );
}
