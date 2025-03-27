
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface BatchFile {
  id: number;
  name: string;
}

const BatchOptimizationSection: React.FC = () => {
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // If running in Electron, use the API to list files
    if (window.electron) {
      const files = window.electron.listFiles('.bat');
      const mappedFiles = files.map((name, index) => ({
        id: index + 1,
        name
      }));
      setBatchFiles(mappedFiles);
    } else {
      // Fallback to mock data when not running in Electron
      setBatchFiles([
        { id: 1, name: "1.bat" },
        { id: 2, name: "2.bat" },
        { id: 3, name: "3.bat" },
        { id: 4, name: "4.bat" },
        { id: 5, name: "5.bat" },
      ]);
    }
  }, []);

  const handleRunBatch = (batch: BatchFile) => {
    console.log(`Running ${batch.name}`);
    
    // If running in Electron, use the API to run the batch file
    if (window.electron) {
      const success = window.electron.runBatchFile(batch.name);
      if (success) {
        toast({
          title: "Batch Script Execution",
          description: `Started ${batch.name}`,
        });
      } else {
        toast({
          title: "Execution Failed",
          description: `Failed to run ${batch.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Batch Script Execution",
        description: `Started ${batch.name}`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Batch Optimization (BAT)</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batchFiles.map((batch) => (
            <Button
              key={batch.id}
              onClick={() => handleRunBatch(batch)}
              className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
              style={{ 
                backgroundColor: '#C92A2A',
                borderColor: '#8B0000'
              }}
            >
              <div className="text-2xl">📜</div>
              <span>{batch.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">Sample Batch Script:</h3>
          <pre className="text-xs text-gray-300 text-left overflow-x-auto">
            @echo off<br/>
            echo Running Minecraft optimization...<br/>
            echo.<br/>
            :: Add your optimization commands here<br/>
            echo Optimization complete!<br/>
            pause
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchOptimizationSection;
