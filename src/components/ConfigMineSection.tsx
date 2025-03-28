
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Settings } from 'lucide-react';

const ConfigMineSection: React.FC = () => {
  const { toast } = useToast();
  const configFileName = "config_mine.bat";

  const handleRunConfig = () => {
    console.log(`Executando configuração do Minecraft: ${configFileName}`);
    
    // Se estiver rodando no Electron, use a API para executar o arquivo batch
    if (window.electron) {
      try {
        const result = window.electron.runBatchFile(configFileName);
        if (result.success) {
          toast({
            title: "Configuração do Minecraft",
            description: "Processo de configuração do Minecraft iniciado",
          });
        } else {
          toast({
            title: "Falha na Configuração",
            description: result.error || "Falha ao executar script de configuração",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Erro ao executar configuração:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro inesperado durante a configuração",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Configuração do Minecraft",
        description: "Processo de configuração do Minecraft iniciado (simulação)",
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white flex items-center">
          <Settings className="mr-2" size={20} />
          Configuração do Minecraft
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Aplique configurações otimizadas à sua instalação do Minecraft.
          </p>
          <Button
            onClick={handleRunConfig}
            className="minecraft-btn btn-hover-slide h-auto py-4 px-8 w-full md:w-auto"
            style={{ 
              backgroundColor: '#00796B',
              borderColor: '#004D40'
            }}
          >
            <span className="text-xl mr-2">⚙️</span>
            Aplicar Configuração Ideal
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">O Que Isso Faz:</h3>
          <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
            <li>Otimiza as configurações do jogo para melhor desempenho</li>
            <li>Ajusta as configurações de renderização e gráficos</li>
            <li>Configura alocação de memória</li>
            <li>Melhora o FPS e reduz lag</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigMineSection;
