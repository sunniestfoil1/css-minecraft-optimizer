import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { AlertTriangle } from 'lucide-react';

interface AppFile {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const ApplicationSection: React.FC = () => {
  const [appFiles, setAppFiles] = useState<AppFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Define os apps que queremos mostrar
    const predefinedApps: AppFile[] = [
      { id: 1, name: "1.exe", icon: "💻", description: "Otimizador de Sistema" },
      { id: 2, name: "2.exe", icon: "🚀", description: "Acelerador de Desempenho" },
      { id: 3, name: "3.exe", icon: "🔧", description: "Reparo do Sistema" },
      { id: 4, name: "4.exe", icon: "⚙️", description: "Configuração Avançada" }
    ];
    
    if (window.electron) {
      const files = window.electron.listFiles('.exe');
      console.log('Arquivos .exe encontrados:', files);
      
      // Filtra os apps predefinidos para incluir apenas aqueles que existem no diretório de arquivos
      const availableApps = predefinedApps.filter(app => 
        files.includes(app.name)
      );
      
      setAppFiles(availableApps);
    } else {
      setAppFiles(predefinedApps);
    }
  }, []);

  const handleRunApp = (app: AppFile) => {
    console.log(`Iniciando ${app.name}`);
    
    if (window.electron) {
      const result = window.electron.runExecutable(app.name);
      if (result.success) {
        toast({
          title: "Aplicativo Iniciado",
          description: `Iniciou ${app.description}`,
        });
      } else {
        toast({
          title: "Falha ao Iniciar",
          description: result.error || `Falha ao iniciar ${app.name}`,
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Aplicativo Iniciado",
        description: `Iniciou ${app.description}`,
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white">Aplicativos de Otimização do Sistema</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {appFiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {appFiles.map((app) => (
              <Button
                key={app.id}
                onClick={() => handleRunApp(app)}
                className="minecraft-btn btn-hover-slide h-auto py-4 flex flex-col items-center space-y-2"
              >
                <div className="text-2xl">{app.icon}</div>
                <span>{app.description}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-yellow-900/30 rounded-md border border-yellow-900/50 flex items-center">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <p className="text-yellow-200 text-sm">
              Nenhum arquivo executável encontrado no diretório 'files'. Adicione arquivos .exe para habilitar o lançamento de aplicativos.
            </p>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-blue-900/30 text-blue-200 rounded-md border border-blue-900/50 text-xs">
          <strong>Nota de Segurança:</strong> Os aplicativos serão executados com as mesmas permissões 
          que este otimizador. Execute apenas programas confiáveis de fontes verificadas.
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationSection;
