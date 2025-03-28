
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface PowerPlan {
  id: number;
  name: string;
}

const PowerPlansSection: React.FC = () => {
  const [powerPlans, setPowerPlans] = useState<PowerPlan[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // If running in Electron, use the API to list files
    if (window.electron) {
      const files = window.electron.listFiles('.pow');
      const mappedFiles = files.map((name, index) => ({
        id: index + 1,
        name
      }));
      setPowerPlans(mappedFiles);
    } else {
      // Fallback to mock data when not running in Electron
      setPowerPlans([
        { id: 1, name: "HighPerformance.pow" },
        { id: 2, name: "Balanced.pow" },
        { id: 3, name: "PowerSaver.pow" },
        { id: 4, name: "Ultimate.pow" },
        { id: 5, name: "Gaming.pow" },
      ]);
    }
  }, []);

  const handleApplyPowerPlan = (plan: PowerPlan) => {
    console.log(`Applying power plan: ${plan.name}`);
    
    // If running in Electron, use the API to apply the power plan
    if (window.electron) {
      const result = window.electron.runPowerPlan(plan.name);
      if (result.success) {
        toast({
          title: "Power Plan Applied",
          description: `Activated ${plan.name}`,
        });
      } else {
        toast({
          title: "Application Failed",
          description: result.error || `Failed to apply ${plan.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Power Plan Applied",
        description: `Activated ${plan.name} (simulation)`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Power Plans</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {powerPlans.map((plan) => (
            <Button
              key={plan.id}
              onClick={() => handleApplyPowerPlan(plan)}
              className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
              style={{ 
                backgroundColor: '#8E44AD',
                borderColor: '#6C3483'
              }}
            >
              <div className="text-2xl">⚡</div>
              <span>{plan.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">About Power Plans:</h3>
          <p className="text-xs text-gray-300">
            Power plans in Windows determine how your computer uses power. For gaming, 
            a High Performance plan is recommended. The Ultimate and Gaming plans are 
            custom plans optimized for Minecraft performance.
          </p>
          <div className="mt-3 p-2 bg-yellow-900/30 text-yellow-200 rounded-md text-xs">
            <strong>Note:</strong> Applying power plans requires administrator privileges. 
            If you encounter issues, try running the application as administrator.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerPlansSection;
