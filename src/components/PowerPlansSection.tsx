
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface PowerPlan {
  id: number;
  name: string;
  description: string;
}

const PowerPlansSection: React.FC = () => {
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from scanning the files folder
  const powerPlans: PowerPlan[] = [
    { id: 1, name: "Ultimate Performance", description: "Maximum performance for gaming" },
    { id: 2, name: "High Performance", description: "Optimized for high FPS" },
    { id: 3, name: "Balanced Gaming", description: "Balance between performance and battery" },
    { id: 4, name: "Battery Saver", description: "For laptop gaming on battery" },
  ];

  const handleActivatePlan = (plan: PowerPlan) => {
    // In a real desktop app, this would activate the power plan
    console.log(`Activating ${plan.name}`);
    // Placeholder for actual activation logic
    toast({
      title: "Power Plan Activated",
      description: `${plan.name} power plan is now active`,
    });
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Power Plans</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {powerPlans.map((plan) => (
            <div 
              key={plan.id}
              className="p-4 bg-black/30 rounded-lg border border-glass-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="text-left">
                <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>
              <Button 
                onClick={() => handleActivatePlan(plan)}
                className="minecraft-btn btn-hover-slide"
                style={{ 
                  backgroundColor: '#5dc21e',
                  borderColor: '#3a7113'
                }}
              >
                Activate
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerPlansSection;
