
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientConfig {
  id: number;
  name: string;
  icon: string;
}

const ClientConfigSection: React.FC = () => {
  // Mock data - in a real app, this would be configurable
  const clientConfigs: ClientConfig[] = [
    { id: 1, name: "Vanilla", icon: "🧊" },
    { id: 2, name: "Badlion", icon: "🛡️" },
    { id: 3, name: "Lunar", icon: "🌙" },
    { id: 4, name: "CM Client", icon: "⚔️" },
    { id: 5, name: "Forge", icon: "🔨" },
    { id: 6, name: "Fabric", icon: "🧵" },
  ];

  const handleConfigureClient = (client: ClientConfig) => {
    // In a real desktop app, this would configure the selected client
    console.log(`Configuring ${client.name}`);
    // Placeholder for actual configuration logic
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Client Configurations</CardTitle>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </CardContent>
    </Card>
  );
};

export default ClientConfigSection;
