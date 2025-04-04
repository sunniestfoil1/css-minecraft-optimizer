
import React, { useState } from 'react';
import ApplicationSection from './ApplicationSection';
import ClientConfigSection from './ClientConfigSection';
import BatchOptimizationSection from './BatchOptimizationSection';
import HardwareOptimizationSection from './HardwareOptimizationSection';
import PowerPlansSection from './PowerPlansSection';
import SystemInfoPanel from './SystemInfoPanel';
import ConfigMineSection from './ConfigMineSection';
import TexturaSection from './TexturaSection';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apps');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'apps':
        return <ApplicationSection />;
      case 'clients':
        return <ClientConfigSection />;
      case 'batch':
        return <BatchOptimizationSection />;
      case 'hardware':
        return <HardwareOptimizationSection />;
      case 'power':
        return <PowerPlansSection />;
      case 'config':
        return <ConfigMineSection />;
      case 'textura':
        return <TexturaSection />;
      default:
        return <ApplicationSection />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="bg-glass-background backdrop-blur-md border-b border-glass-border p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-minecraft-green to-minecraft-diamond">
              Otimizador de Minecraft
            </span>
          </h1>
          
          <div className="flex flex-wrap justify-center sm:justify-end gap-2">
            <button
              onClick={() => setActiveTab('apps')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'apps'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Aplicativos
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'clients'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Clientes
            </button>
            <button
              onClick={() => setActiveTab('batch')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'batch'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Batch
            </button>
            <button
              onClick={() => setActiveTab('hardware')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'hardware'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Hardware
            </button>
            <button
              onClick={() => setActiveTab('power')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'power'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Energia
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'config'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Config
            </button>
            <button
              onClick={() => setActiveTab('textura')}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === 'textura'
                  ? 'bg-minecraft-green text-white'
                  : 'bg-glass-background hover:bg-glass-hover text-gray-300'
              }`}
            >
              Textura
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-auto p-6 bg-background">
        <div className="container mx-auto animate-fade-in">
          <SystemInfoPanel />
          {renderTabContent()}
        </div>
      </main>
      
      <footer className="bg-glass-background backdrop-blur-md border-t border-glass-border p-3">
        <div className="container mx-auto text-center text-xs text-gray-500">
          Otimizador de Minecraft v1.0.0 | Apenas para Windows 10/11
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
