
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SystemInfo {
  osVersion: string;
  platform: string;
  hostname: string;
  totalMemory: number;
  freeMemory: number;
}

const SystemInfoPanel: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    if (window.electron) {
      const info = window.electron.getSystemInfo();
      setSystemInfo(info);
    } else {
      // Mock data for development without Electron
      setSystemInfo({
        osVersion: 'Windows 11',
        platform: 'win32',
        hostname: 'DESKTOP-USER',
        totalMemory: 16,
        freeMemory: 8
      });
    }
  }, []);

  if (!systemInfo) {
    return <div>Loading system information...</div>;
  }

  const isValidWindows = 
    systemInfo.osVersion === 'Windows 10' || 
    systemInfo.osVersion === 'Windows 11';

  return (
    <Card className="glass-panel mb-6">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">System Information</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">OS</h3>
            <p className={`text-sm ${isValidWindows ? 'text-minecraft-green' : 'text-red-500'}`}>
              {systemInfo.osVersion}
              {!isValidWindows && ' (Unsupported)'}
            </p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Computer Name</h3>
            <p className="text-sm text-gray-300">{systemInfo.hostname}</p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Memory</h3>
            <p className="text-sm text-gray-300">
              {systemInfo.freeMemory} GB Free / {systemInfo.totalMemory} GB Total
            </p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Status</h3>
            <p className={`text-sm ${isValidWindows ? 'text-minecraft-green' : 'text-red-500'}`}>
              {isValidWindows ? 'Ready' : 'Unsupported OS'}
            </p>
          </div>
        </div>
        
        {!isValidWindows && (
          <div className="mt-4 p-3 bg-red-900/50 text-white rounded-md border border-red-500">
            <p className="text-sm">
              This application is designed to work only on Windows 10 and Windows 11.
              Some features may not work correctly on your current operating system.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemInfoPanel;
