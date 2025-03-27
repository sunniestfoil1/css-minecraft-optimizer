
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AppFile {
  id: number;
  name: string;
}

const ApplicationSection: React.FC = () => {
  // Mock data - in a real app, this would come from scanning the files folder
  const appFiles: AppFile[] = [
    { id: 1, name: "1.exe" },
    { id: 2, name: "2.exe" },
    { id: 3, name: "3.exe" },
    { id: 4, name: "4.exe" },
    { id: 5, name: "5.exe" },
  ];

  const handleRunApp = (app: AppFile) => {
    // In a real desktop app, this would execute the .exe file
    console.log(`Launching ${app.name}`);
    // Placeholder for actual execution logic
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
