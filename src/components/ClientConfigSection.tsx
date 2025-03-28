
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from 'lucide-react';

interface ClientConfig {
  id: number;
  name: string;
  icon: string;
  filename: string;
}

const ClientConfigSection: React.FC = () => {
  // Specific client configs with corresponding batch file names
  const clientConfigs: ClientConfig[] = [
    { id: 1, name: "Badlion", icon: "🛡️", filename: "BADLION.bat" },
    { id: 2, name: "CM Client", icon: "⚔️", filename: "CM CLIENT.bat" },
    { id: 3, name: "Lunar", icon: "🌙", filename: "LUNAR.bat" },
  ];

  const { toast } = useToast();

  const handleConfigureClient = (client: ClientConfig) => {
    console.log(`Configuring ${client.name} using ${client.filename}`);
    
    // If running in Electron, use the API to run the batch file
    if (window.electron) {
      try {
        const result = window.electron.runBatchFile(client.filename);
        if (result.success) {
          toast({
            title: "Client Configuration",
            description: `Started configuration for ${client.name}`,
          });
        } else {
          toast({
            title: "Configuration Failed",
            description: result.error || `Failed to configure ${client.name}`,
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error(`Error configuring ${client.name}:`, error);
        toast({
          title: "Error",
          description: `An unexpected error occurred configuring ${client.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Client Configuration",
        description: `Started configuration for ${client.name} (simulation)`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Client Configurations</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {clientConfigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {clientConfigs.map((client) => (
              <Button
                key={client.id}
                onClick={() => handleConfigureClient(client)}
                className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
                variant="secondary"
                style={{ 
                  backgroundColor: '#333',
                  borderColor: '#222'
                }}
              >
                <div className="text-2xl">{client.icon}</div>
                <span>{client.name}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-yellow-900/30 rounded-md border border-yellow-900/50 flex items-center">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <p className="text-yellow-200 text-sm">
              No client configuration files found in the 'files' directory.
            </p>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-900/30 text-blue-200 rounded-md border border-blue-900/50 text-xs">
          <strong>Note:</strong> These configurations will optimize your Minecraft clients for better performance.
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientConfigSection;
