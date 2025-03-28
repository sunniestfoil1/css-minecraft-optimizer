
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PaintBucket } from 'lucide-react';

const TexturaSection: React.FC = () => {
  const { toast } = useToast();
  const texturaFileName = "TEXTURA.bat";

  const handleApplyTexture = () => {
    console.log(`Applying texture pack: ${texturaFileName}`);
    
    // If running in Electron, use the API to run the batch file
    if (window.electron) {
      try {
        const result = window.electron.runBatchFile(texturaFileName);
        if (result.success) {
          toast({
            title: "Texture Pack",
            description: "Started texture pack installation",
          });
        } else {
          toast({
            title: "Texture Installation Failed",
            description: result.error || "Failed to install texture pack",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Error applying texture pack:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred installing texture pack",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Texture Pack",
        description: "Started texture pack installation (simulation)",
      });
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="glass-panel-header">
        <CardTitle className="text-white flex items-center">
          <PaintBucket className="mr-2" size={20} />
          Texture Pack Installer
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <p className="text-gray-300 mb-4">
            Install optimized texture packs for better performance while maintaining visual quality.
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
            Install Optimized Textures
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-black/30 rounded-md border border-glass-border">
          <h3 className="text-sm font-medium text-white mb-2">Benefits:</h3>
          <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
            <li>Lower resolution textures for better performance</li>
            <li>Maintains visual quality and aesthetics</li>
            <li>Reduces VRAM usage</li>
            <li>Decreases loading times</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default TexturaSection;
