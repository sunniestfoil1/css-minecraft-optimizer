
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

const HardwareOptimizationSection: React.FC = () => {
  const { toast } = useToast();
  const [ramOptProgress, setRamOptProgress] = useState(0);
  const [diskOptProgress, setDiskOptProgress] = useState(0);
  const [optimizing, setOptimizing] = useState<string | null>(null);

  const runRamOptimization = () => {
    // In a real desktop app, this would execute ram.exe
    console.log("Running RAM optimization");
    setOptimizing('ram');
    setRamOptProgress(0);
    
    // Simulate the optimization process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setRamOptProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setOptimizing(null);
          toast({
            title: "RAM Optimization Complete",
            description: "Memory has been optimized for Minecraft",
          });
        }, 500);
      }
    }, 150);
  };

  const runDiskOptimization = () => {
    // In a real desktop app, this would execute disk optimization scripts
    console.log("Running Disk optimization");
    setOptimizing('disk');
    setDiskOptProgress(0);
    
    // Simulate the optimization process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setDiskOptProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setOptimizing(null);
          toast({
            title: "Disk Optimization Complete",
            description: "Storage has been optimized for Minecraft",
          });
        }, 500);
      }
    }, 180);
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Hardware Optimization</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-black/30 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-4">RAM Optimization</h3>
            {optimizing === 'ram' ? (
              <div className="space-y-3">
                <Progress value={ramOptProgress} className="h-2" />
                <p className="text-sm text-gray-300">Optimizing RAM: {ramOptProgress}%</p>
              </div>
            ) : (
              <Button 
                onClick={runRamOptimization}
                className="minecraft-btn btn-hover-slide w-full"
                style={{ 
                  backgroundColor: '#27A9CC',
                  borderColor: '#1A6F8A'
                }}
                disabled={optimizing !== null}
              >
                Run RAM Optimization
              </Button>
            )}
          </div>
          
          <div className="p-4 bg-black/30 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-4">Disk Optimization</h3>
            {optimizing === 'disk' ? (
              <div className="space-y-3">
                <Progress value={diskOptProgress} className="h-2" />
                <p className="text-sm text-gray-300">Optimizing Disk: {diskOptProgress}%</p>
              </div>
            ) : (
              <Button 
                onClick={runDiskOptimization}
                className="minecraft-btn btn-hover-slide w-full"
                style={{ 
                  backgroundColor: '#DEB12D',
                  borderColor: '#9A7A1E'
                }}
                disabled={optimizing !== null}
              >
                Run Disk Optimization
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">System Information:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
            <div className="text-left">RAM:</div>
            <div className="text-right">Detected automatically</div>
            <div className="text-left">Storage:</div>
            <div className="text-right">Detected automatically</div>
            <div className="text-left">Performance Mode:</div>
            <div className="text-right">High Performance</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HardwareOptimizationSection;
