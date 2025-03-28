
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
      // Dados fictícios para desenvolvimento sem Electron
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
    return <div>Carregando informações do sistema...</div>;
  }

  const isValidWindows = 
    systemInfo.osVersion === 'Windows 10' || 
    systemInfo.osVersion === 'Windows 11';

  return (
    <Card className="glass-panel mb-6">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Informações do Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Sistema Operacional</h3>
            <p className={`text-sm ${isValidWindows ? 'text-minecraft-green' : 'text-red-500'}`}>
              {systemInfo.osVersion}
              {!isValidWindows && ' (Não suportado)'}
            </p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Nome do Computador</h3>
            <p className="text-sm text-gray-300">{systemInfo.hostname}</p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Memória</h3>
            <p className="text-sm text-gray-300">
              {systemInfo.freeMemory} GB Livre / {systemInfo.totalMemory} GB Total
            </p>
          </div>
          
          <div className="bg-black/30 p-4 rounded-lg border border-glass-border">
            <h3 className="text-lg font-medium text-white mb-2">Status</h3>
            <p className={`text-sm ${isValidWindows ? 'text-minecraft-green' : 'text-red-500'}`}>
              {isValidWindows ? 'Pronto' : 'Sistema Operacional não suportado'}
            </p>
          </div>
        </div>
        
        {!isValidWindows && (
          <div className="mt-4 p-3 bg-red-900/50 text-white rounded-md border border-red-500">
            <p className="text-sm">
              Este aplicativo foi projetado para funcionar apenas no Windows 10 e Windows 11.
              Algumas funcionalidades podem não funcionar corretamente no seu sistema operacional atual.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemInfoPanel;
