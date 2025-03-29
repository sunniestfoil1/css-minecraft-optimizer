
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Inicializa o aplicativo React no elemento root
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
