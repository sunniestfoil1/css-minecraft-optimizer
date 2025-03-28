
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle, Terminal } from 'lucide-react';

interface BatchFile {
  id: number;
  name: string;
}

const BatchOptimizationSection: React.FC = () => {
  const [batchFiles, setBatchFiles] = useState<BatchFile[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // If running in Electron, use the API to list files
    if (window.electron) {
      try {
        const files = window.electron.listFiles('.bat');
        console.log('Found batch files:', files);
        const mappedFiles = files.map((name, index) => ({
          id: index + 1,
          name
        }));
        setBatchFiles(mappedFiles);
      } catch (error) {
        console.error('Error listing batch files:', error);
        toast({
          title: "Error",
          description: "Failed to list batch files. Check the console for details.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Fallback to mock data when not running in Electron
      setBatchFiles([
        { id: 1, name: "1.bat" },
        { id: 2, name: "2.bat" },
        { id: 3, name: "3.bat" },
        { id: 4, name: "4.bat" },
        { id: 5, name: "5.bat" },
      ]);
      setLoading(false);
    }
  }, [toast]);

  const handleRunBatch = (batch: BatchFile) => {
    console.log(`Running ${batch.name}`);
    
    // If running in Electron, use the API to run the batch file
    if (window.electron) {
      try {
        const result = window.electron.runBatchFile(batch.name);
        if (result.success) {
          toast({
            title: "Batch Script Execution",
            description: `Started ${batch.name}`,
          });
        } else {
          toast({
            title: "Execution Failed",
            description: result.error || `Failed to run ${batch.name}`,
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error running batch file:', error);
        toast({
          title: "Error",
          description: `An unexpected error occurred running ${batch.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Batch Script Execution",
        description: `Started ${batch.name} (simulation)`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white flex items-center">
          <Terminal className="mr-2" size={20} />
          Batch Optimization (BAT)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-minecraft-green"></div>
          </div>
        ) : batchFiles.length > 0 ? (
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
        ) : (
          <div className="p-4 bg-yellow-900/30 rounded-md border border-yellow-900/50 flex items-center">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <p className="text-yellow-200 text-sm">
              No batch files found in the 'files' directory. Add .bat files to enable optimization scripts.
            </p>
          </div>
        )}
        
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
          
          <div className="mt-3 p-2 bg-blue-900/30 text-blue-200 rounded-md text-xs">
            <strong>Security Note:</strong> Batch files can execute system commands. 
            Only run scripts from trusted sources. Scripts will run with the same 
            permissions as this application.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchOptimizationSection;
