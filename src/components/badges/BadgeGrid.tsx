import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { badges } from "@/data/badges";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function BadgeGrid() {
  const { currentUser } = useAuth();
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!currentUser) return;

    const fetchUserBadges = async () => {
      try {
        const { data, error } = await supabase
          .from('userStats')
          .select('badges')
          .eq('userId', currentUser.uid)
          .maybeSingle();
        if (error) throw error;
        setUserBadges(data?.badges || []);
      } catch (error) {
        console.error("Error fetching user badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBadges();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-muted rounded-xl"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6">
      {badges.map((badge) => {
        const isEarned = userBadges.includes(badge.id);
        
        return (
          <Card 
            key={badge.id} 
            className={`eco-card ${isEarned ? 'border-amber-400' : 'opacity-70'}`}
          >
            <CardHeader className="pb-2">
              <CardTitle className={`text-lg ${isEarned ? 'text-amber-600' : ''}`}>
                {badge.name}
              </CardTitle>
              <CardDescription>{badge.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center
                  ${isEarned ? 'badge-gradient animate-pulse-slow' : 'bg-secondary'}`}
              >
                <span className="text-2xl">
                  {isEarned ? "🏆" : "🔒"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {isEarned 
                  ? "Badge earned!" 
                  : badge.requirement.type === "streak"
                    ? `Streak for ${badge.requirement.count} days`
                    : badge.requirement.type === "totalActions"
                    ? `Complete ${badge.requirement.count} actions`
                    : `Specific action requirement`
                }
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
