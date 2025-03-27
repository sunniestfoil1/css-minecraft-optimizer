
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PasswordPanelProps {
  onAuthenticated: () => void;
}

const PasswordPanel: React.FC<PasswordPanelProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { toast } = useToast();
  
  // For demo purposes, any password works
  const handleLogin = () => {
    setIsLoading(true);
    
    // Simulate loading process
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          onAuthenticated();
          toast({
            title: "Authentication successful",
            description: "Welcome to the Minecraft Optimizer",
          });
        }, 500);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-xl">
      <div className="glass-panel w-full max-w-md p-8 animate-scale-in card-glow">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative w-24 h-24 mb-4 animate-float">
            <div className="absolute inset-0 bg-minecraft-green opacity-20 rounded-md animate-pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[url('https://i.imgur.com/hrC1IM9.png')] bg-cover bg-center rounded-md"></div>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-minecraft-green to-minecraft-diamond">
              Minecraft Optimizer
            </span>
          </h1>
          
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-glass-border text-white placeholder:text-gray-500 focus:ring-minecraft-green"
                disabled={isLoading}
              />
              
              {isLoading && (
                <div className="w-full bg-black/50 rounded-full h-2 mt-4">
                  <div 
                    className="bg-gradient-to-r from-minecraft-green to-minecraft-diamond h-2 rounded-full shimmer-effect transition-all duration-300 ease-out"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleLogin} 
              className="minecraft-btn w-full btn-hover-slide" 
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Authenticate"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPanel;
