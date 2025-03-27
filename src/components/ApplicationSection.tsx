
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
      const success = window.electron.runExecutable(app.name);
      if (success) {
        toast({
          title: "Application Launched",
          description: `Started ${app.name}`,
        });
      } else {
        toast({
          title: "Launch Failed",
          description: `Failed to start ${app.name}`,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Applications</CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </CardContent>
    </Card>
  );
};

export default ApplicationSection;
