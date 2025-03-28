
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from 'lucide-react';

interface AppFile {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const ApplicationSection: React.FC = () => {
  const [appFiles, setAppFiles] = useState<AppFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Define the apps we want to show
    const predefinedApps: AppFile[] = [
      { id: 1, name: "1.exe", icon: "💻", description: "System Optimizer" },
      { id: 2, name: "2.exe", icon: "🚀", description: "Performance Booster" },
      { id: 3, name: "3.exe", icon: "🔧", description: "System Repair" },
      { id: 4, name: "4.exe", icon: "⚙️", description: "Advanced Configuration" }
    ];
    
    // If running in Electron, check if these files actually exist
    if (window.electron) {
      const files = window.electron.listFiles('.exe');
      console.log('Found exe files:', files);
      
      // Filter predefined apps to only include those that exist in the files directory
      const availableApps = predefinedApps.filter(app => 
        files.includes(app.name)
      );
      
      setAppFiles(availableApps);
    } else {
      // Fallback to predefined apps when not running in Electron
      setAppFiles(predefinedApps);
    }
  }, []);

  const handleRunApp = (app: AppFile) => {
    console.log(`Launching ${app.name}`);
    
    // If running in Electron, use the API to run the executable
    if (window.electron) {
      const result = window.electron.runExecutable(app.name);
      if (result.success) {
        toast({
          title: "Application Launched",
          description: `Started ${app.description}`,
        });
      } else {
        toast({
          title: "Launch Failed",
          description: result.error || `Failed to start ${app.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Application Launched",
        description: `Started ${app.description} (simulation)`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">System Optimization Applications</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {appFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {appFiles.map((app) => (
              <Button
                key={app.id}
                onClick={() => handleRunApp(app)}
                className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
              >
                <div className="text-2xl">{app.icon}</div>
                <span>{app.description}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-yellow-900/30 rounded-md border border-yellow-900/50 flex items-center">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <p className="text-yellow-200 text-sm">
              No executable files found in the 'files' directory. Add .exe files to enable application launching.
            </p>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-900/30 text-blue-200 rounded-md border border-blue-900/50 text-xs">
          <strong>Security Note:</strong> Applications will run with the same permissions 
          as this optimizer. Only run trusted programs from verified sources.
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationSection;
