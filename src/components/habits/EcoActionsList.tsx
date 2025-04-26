
import { useState, useEffect } from "react";
import EcoActionCard from "./EcoActionCard";
import { ecoActions } from "@/data/ecoActions";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
        setIsLoading(true);
        const startOfDay = new Date(today);
        const endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        const { data, error } = await supabase
          .from('ecoLogs')
          .select('actionId')
          .eq('userId', currentUser.uid)
          .gte('date', startOfDay.toISOString())
          .lte('date', endOfDay.toISOString());

        if (error) {
          throw error;
        }

        // Extract action IDs from the data
        const actionIds = data?.map(log => log.actionId) || [];
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

      // Add to Supabase
      const { error } = await supabase
        .from('ecoLogs')
        .insert({
          userId: currentUser.uid,
          actionId: actionId,
          actionName: action.name,
          points: action.points,
          date: new Date().toISOString(),
          notes: notes || "",
        });

      if (error) throw error;

      // Update local state immediately
      setLoggedActions(prev => [...prev, actionId]);

      toast({
        title: "Action Logged!",
        description: `You earned ${action.points} eco-points for ${action.name}.`,
      });
      
      // Update user stats
      try {
        // Check if user stats entry exists
        const { data: existingStats, error: statsCheckError } = await supabase
          .from('userStats')
          .select('*')
          .eq('userId', currentUser.uid)
          .maybeSingle();
        
        if (statsCheckError) throw statsCheckError;
        
        if (!existingStats) {
          // Create new stats if it doesn't exist
          const { error: createStatsError } = await supabase
            .from('userStats')
            .insert({
              userId: currentUser.uid,
              totalPoints: action.points,
              totalCarbonSaved: action.points, // 1 point = 1kg CO2 saved
              currentStreak: 1,
              longestStreak: 1,
              totalActions: 1,
              lastActionDate: new Date().toISOString(),
              badges: []
            });
            
          if (createStatsError) throw createStatsError;
        } else {
          // Update existing stats
          const { error: updateStatsError } = await supabase
            .from('userStats')
            .update({
              totalPoints: existingStats.totalPoints + action.points,
              totalCarbonSaved: existingStats.totalCarbonSaved + action.points,
              totalActions: existingStats.totalActions + 1,
              lastActionDate: new Date().toISOString()
            })
            .eq('userId', currentUser.uid);
            
          if (updateStatsError) throw updateStatsError;
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
