
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EcoAction } from "@/types";
import { Car, Recycle, Calendar, Bus, Trash, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EcoActionCardProps {
  action: EcoAction;
  onLog: (actionId: string, notes: string) => void;
  isLogged: boolean;
}

export default function EcoActionCard({ action, onLog, isLogged }: EcoActionCardProps) {
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    onLog(action.id, notes);
    setNotes("");
    setOpen(false);
  };

  const getIcon = () => {
    switch (action.icon) {
      case "car":
        return <Car className="h-6 w-6" />;
      case "recycle":
        return <Recycle className="h-6 w-6" />;
      case "calendar":
        return <Calendar className="h-6 w-6" />;
      case "bus":
        return <Bus className="h-6 w-6" />;
      case "trash":
        return <Trash className="h-6 w-6" />;
      case "plus":
        return <Plus className="h-6 w-6" />;
      default:
        return <Plus className="h-6 w-6" />;
    }
  };

  return (
    <Card className={cn(
      "eco-card transition-all duration-300 hover:-translate-y-1",
      isLogged && "border-green-400 bg-green-50 dark:bg-green-900/20"
    )}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            {getIcon()}
            {action.name}
          </span>
          <span className="text-primary font-semibold">+{action.points} pts</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">{action.description}</p>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              variant={isLogged ? "outline" : "default"}
              className={cn(
                "w-full mt-2",
                !isLogged && "eco-gradient text-white"
              )}
              disabled={isLogged}
            >
              {isLogged ? "Completed ✓" : "Log Action"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log {action.name}</DialogTitle>
              <DialogDescription>
                Add optional notes about this eco-friendly action.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Textarea
                placeholder="Add notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} className="eco-gradient">
                Log Action
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
