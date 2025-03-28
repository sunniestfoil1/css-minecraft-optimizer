
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from 'lucide-react';

interface AppFile {
  id: number;
  name: string;
}

const ApplicationSection: React.FC = () => {
  const [appFiles, setAppFiles] = useState<AppFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // If running in Electron, use the API to list files
    if (window.electron) {
      const files = window.electron.listFiles('.exe');
      const mappedFiles = files.map((name, index) => ({
        id: index + 1,
        name
      }));
      setAppFiles(mappedFiles);
    } else {
      // Fallback to mock data when not running in Electron
      setAppFiles([
        { id: 1, name: "1.exe" },
        { id: 2, name: "2.exe" },
        { id: 3, name: "3.exe" },
        { id: 4, name: "4.exe" },
        { id: 5, name: "5.exe" },
      ]);
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
          description: `Started ${app.name}`,
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
        description: `Started ${app.name} (simulation)`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Applications</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {appFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appFiles.map((app) => (
              <Button
                key={app.id}
                onClick={() => handleRunApp(app)}
                className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
              >
                <div className="text-2xl">💾</div>
                <span>{app.name}</span>
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
