
import React, { useState, useEffect } from 'react';
import PasswordPanel from '@/components/PasswordPanel';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showingPasswordPanel, setShowingPasswordPanel] = useState(true);

  // Lidar com autenticação bem-sucedida
  const handleAuthenticated = () => {
    setTimeout(() => {
      setIsAuthenticated(true);
      setTimeout(() => {
        setShowingPasswordPanel(false);
      }, 500); // Atraso para permitir animações de transição
    }, 500);
  };

  // Simular execução inicial do CMD (em um aplicativo real, isso seria implementado de forma diferente)
  useEffect(() => {
    console.log("Janela CMD seria aberta aqui antes do início do aplicativo");
    // Em um aplicativo desktop real, você adicionaria o código para abrir uma janela CMD aqui
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-black to-zinc-900">
      {/* Elementos de fundo para apelo visual */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-minecraft-green/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-minecraft-diamond/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-minecraft-gold/5 rounded-full blur-[120px]"></div>
        
        {/* Padrão de grade sobreposto */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {showingPasswordPanel && (
          <PasswordPanel onAuthenticated={handleAuthenticated} />
        )}
        
        {isAuthenticated && (
          <div className={`min-h-screen w-full ${showingPasswordPanel ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
