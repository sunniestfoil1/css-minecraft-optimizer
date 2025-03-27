
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { X, Minus, Square } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* Window controls for desktop app */}
      <div className="fixed top-0 right-0 z-50 flex items-center m-2 space-x-2">
        <button 
          onClick={() => window.electron?.minimizeWindow?.()}
          className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-800 hover:text-white"
        >
          <Minus size={16} />
        </button>
        <button 
          onClick={() => window.electron?.maximizeWindow?.()}
          className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-800 hover:text-white"
        >
          <Square size={16} />
        </button>
        <button 
          onClick={() => window.electron?.closeWindow?.()}
          className="p-1 text-gray-400 transition-colors rounded-full hover:bg-red-500 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
