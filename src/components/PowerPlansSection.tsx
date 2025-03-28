
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface PowerPlan {
  id: number;
  name: string;
}

const PowerPlansSection: React.FC = () => {
  const [powerPlans, setPowerPlans] = useState<PowerPlan[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Se estiver rodando no Electron, use a API para listar arquivos
    if (window.electron) {
      const files = window.electron.listFiles('.pow');
      const mappedFiles = files.map((name, index) => ({
        id: index + 1,
        name
      }));
      setPowerPlans(mappedFiles);
    } else {
      // Fallback para dados fictícios quando não estiver rodando no Electron
      setPowerPlans([
        { id: 1, name: "AltoDesempenho.pow" },
        { id: 2, name: "Balanceado.pow" },
        { id: 3, name: "Economia.pow" },
        { id: 4, name: "Ultimate.pow" },
        { id: 5, name: "Gaming.pow" },
      ]);
    }
  }, []);

  const handleApplyPowerPlan = (plan: PowerPlan) => {
    console.log(`Aplicando plano de energia: ${plan.name}`);
    
    // Se estiver rodando no Electron, use a API para aplicar o plano de energia
    if (window.electron) {
      const result = window.electron.runPowerPlan(plan.name);
      if (result.success) {
        toast({
          title: "Plano de Energia Aplicado",
          description: `Ativado ${plan.name}`,
        });
      } else {
        toast({
          title: "Falha na Aplicação",
          description: result.error || `Falha ao aplicar ${plan.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Plano de Energia Aplicado",
        description: `Ativado ${plan.name} (simulação)`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Planos de Energia</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {powerPlans.map((plan) => (
            <Button
              key={plan.id}
              onClick={() => handleApplyPowerPlan(plan)}
              className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
              style={{ 
                backgroundColor: '#8E44AD',
                borderColor: '#6C3483'
              }}
            >
              <div className="text-2xl">⚡</div>
              <span>{plan.name}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">Sobre Planos de Energia:</h3>
          <p className="text-xs text-gray-300">
            Os planos de energia no Windows determinam como seu computador usa energia. Para jogos, 
            um plano de Alto Desempenho é recomendado. Os planos Ultimate e Gaming são 
            planos personalizados otimizados para o desempenho do Minecraft.
          </p>
          <div className="mt-3 p-2 bg-yellow-900/30 text-yellow-200 rounded-md text-xs">
            <strong>Nota:</strong> A aplicação de planos de energia requer privilégios de administrador. 
            Se encontrar problemas, tente executar o aplicativo como administrador.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PowerPlansSection;
