import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PaintBucket } from 'lucide-react';

const TexturaSection: React.FC = () => {
  const { toast } = useToast();
  const texturaFileName = "TEXTURA.bat";

  const handleApplyTexture = () => {
    console.log(`Aplicando pacote de textura: ${texturaFileName}`);
    
    if (window.electron) {
      try {
        const result = window.electron.runBatchFile(texturaFileName);
        if (result.success) {
          toast({
            title: "Pacote de Textura",
            description: "Iniciou a instalação do pacote de textura",
          });
        } else {
          toast({
            title: "Falha na Instalação da Textura",
            description: result.error || "Falha ao instalar o pacote de textura",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Erro ao aplicar pacote de textura:', error);
        toast({
          title: "Erro",
          description: "Ocorreu um erro inesperado ao instalar o pacote de textura",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Pacote de Textura",
        description: "Iniciou a instalação do pacote de textura",
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white flex items-center">
          <PaintBucket className="mr-2" size={20} />
          Instalador de Pacotes de Textura
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Instale pacotes de textura otimizados para melhor desempenho mantendo a qualidade visual.
          </p>
          <Button
            onClick={handleApplyTexture}
            className="minecraft-btn btn-hover-slide h-auto py-4 px-8 w-full md:w-auto"
            style={{ 
              backgroundColor: '#7B1FA2',
              borderColor: '#4A148C'
            }}
          >
            <span className="text-xl mr-2">🎨</span>
            Instalar Texturas Otimizadas
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">Benefícios:</h3>
          <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
            <li>Texturas de menor resolução para melhor desempenho</li>
            <li>Mantém a qualidade visual e estética</li>
            <li>Reduz o uso de VRAM</li>
            <li>Diminui os tempos de carregamento</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TexturaSection;
