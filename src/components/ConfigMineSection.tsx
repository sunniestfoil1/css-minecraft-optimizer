
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Settings } from 'lucide-react';

const ConfigMineSection: React.FC = () => {
  const { toast } = useToast();
  const configFileName = "config_mine.bat";

  const handleRunConfig = () => {
    console.log(`Running Minecraft configuration: ${configFileName}`);
    
    // If running in Electron, use the API to run the batch file
    if (window.electron) {
      try {
        const result = window.electron.runBatchFile(configFileName);
        if (result.success) {
          toast({
            title: "Minecraft Configuration",
            description: "Started Minecraft configuration process",
          });
        } else {
          toast({
            title: "Configuration Failed",
            description: result.error || "Failed to run configuration script",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error running configuration:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred during configuration",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Minecraft Configuration",
        description: "Started Minecraft configuration process (simulation)",
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white flex items-center">
          <Settings className="mr-2" size={20} />
          Minecraft Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Apply optimized configuration settings to your Minecraft installation.
          </p>
          <Button
            onClick={handleRunConfig}
            className="minecraft-btn btn-hover-slide h-auto py-4 px-8 w-full md:w-auto"
            style={{ 
              backgroundColor: '#00796B',
              borderColor: '#004D40'
            }}
          >
            <span className="text-xl mr-2">⚙️</span>
            Apply Optimal Configuration
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">What This Does:</h3>
          <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
            <li>Optimizes game settings for better performance</li>
            <li>Adjusts rendering and graphics settings</li>
            <li>Configures memory allocation</li>
            <li>Improves FPS and reduces lag</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigMineSection;
