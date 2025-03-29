
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec, execSync } = require('child_process');
const os = require('os');

// Check Windows version
function getWindowsVersion() {
  const release = os.release().split('.');
  const major = parseInt(release[0]);
  const minor = parseInt(release[1]);
  
  if (major === 10) return 'Windows 10';
  if (major === 10 && minor === 0 && parseInt(release[2]) >= 22000) return 'Windows 11';
  if (major === 10 && minor > 0) return 'Windows 11';
  return 'Versão do Windows não suportada';
}

// Get the correct path to files directory
function getFilesPath() {
  // Em desenvolvimento
  let basePath = process.cwd();
  
  // Em produção
  if (process.env.NODE_ENV !== 'development') {
    // Verifica se estamos em um arquivo asar
    if (process.resourcesPath) {
      return path.join(process.resourcesPath, 'files');
    }
    // Fallback para o caminho do aplicativo
    basePath = path.dirname(process.execPath);
  }
  
  return path.join(basePath, 'files');
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Get system info
  getSystemInfo: () => {
    return {
      osVersion: getWindowsVersion(),
      platform: os.platform(),
      hostname: os.hostname(),
      totalMemory: Math.round(os.totalmem() / (1024 * 1024 * 1024)), // GB
      freeMemory: Math.round(os.freemem() / (1024 * 1024 * 1024))    // GB
    };
  },
  
  // Function to run .exe files
  runExecutable: (exeName) => {
    try {
      const filePath = path.join(getFilesPath(), exeName);
      console.log(`Tentando executar: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`Arquivo não existe: ${filePath}`);
        return { success: false, error: 'Arquivo não encontrado' };
      }
      
      // Executa o arquivo .exe
      console.log(`Executando ${exeName}...`);
      execSync(`"${filePath}"`, { windowsHide: false });
      return { success: true };
    } catch (error) {
      console.error('Erro ao executar aplicativo:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Function to run .bat files
  runBatchFile: (batName) => {
    try {
      const filePath = path.join(getFilesPath(), batName);
      console.log(`Tentando executar arquivo batch: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`Arquivo não existe: ${filePath}`);
        return { success: false, error: 'Arquivo não encontrado' };
      }
      
      // Executa o arquivo .bat
      console.log(`Executando ${batName}...`);
      execSync(`cmd.exe /c "${filePath}"`, { windowsHide: false });
      return { success: true };
    } catch (error) {
      console.error('Erro ao executar arquivo batch:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Function to run .pow (power plan) files
  runPowerPlan: (powName) => {
    try {
      const filePath = path.join(getFilesPath(), powName);
      console.log(`Tentando aplicar plano de energia: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`Arquivo não existe: ${filePath}`);
        return { success: false, error: 'Arquivo não encontrado' };
      }
      
      // Para planos de energia, use powercfg.exe
      console.log(`Ativando plano de energia ${powName}...`);
      execSync(`powercfg /import "${filePath}"`, { windowsHide: false });
      
      // Obtém o GUID do esquema de energia importado
      const output = execSync('powercfg /list').toString();
      const match = output.match(/Power Scheme GUID: ([a-f0-9-]+) +\(.*\*\)/i);
      if (match && match[1]) {
        const guid = match[1];
        // Ativa o esquema de energia importado
        execSync(`powercfg /setactive ${guid}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao aplicar plano de energia:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Function to list files in the "files" directory with specific extension
  listFiles: (extension) => {
    try {
      const filesDir = getFilesPath();
      console.log(`Listando arquivos em: ${filesDir}`);
      
      // Cria o diretório se não existir
      if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir, { recursive: true });
      }
      
      const files = fs.readdirSync(filesDir);
      return files.filter(file => file.endsWith(extension));
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      return [];
    }
  },
  
  // Window control functions
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window')
});
