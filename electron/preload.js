
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
  return 'Unsupported Windows Version';
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
      const filePath = path.join(process.cwd(), 'files', exeName);
      console.log(`Attempting to run: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return { success: false, error: 'File not found' };
      }
      
      // In a production app, this would execute the actual .exe file
      console.log(`Executing ${exeName}...`);
      execSync(`"${filePath}"`, { windowsHide: false });
      return { success: true };
    } catch (error) {
      console.error('Error running executable:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Function to run .bat files
  runBatchFile: (batName) => {
    try {
      const filePath = path.join(process.cwd(), 'files', batName);
      console.log(`Attempting to run batch file: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return { success: false, error: 'File not found' };
      }
      
      // In a production app, this would execute the actual .bat file
      console.log(`Executing ${batName}...`);
      execSync(`cmd.exe /c "${filePath}"`, { windowsHide: false });
      return { success: true };
    } catch (error) {
      console.error('Error running batch file:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Function to run .pow (power plan) files
  runPowerPlan: (powName) => {
    try {
      const filePath = path.join(process.cwd(), 'files', powName);
      console.log(`Attempting to run power plan: ${filePath}`);
      
      if (!fs.existsSync(filePath)) {
        console.error(`File does not exist: ${filePath}`);
        return { success: false, error: 'File not found' };
      }
      
      // For power plans, we would use powercfg.exe
      // This is a placeholder for actual power plan functionality
      console.log(`Activating power plan ${powName}...`);
      execSync(`powercfg /import "${filePath}"`, { windowsHide: false });
      
      // Get the GUID of the imported power scheme
      const output = execSync('powercfg /list').toString();
      const match = output.match(/Power Scheme GUID: ([a-f0-9-]+) +\(.*\*\)/i);
      if (match && match[1]) {
        const guid = match[1];
        // Activate the imported power scheme
        execSync(`powercfg /setactive ${guid}`);
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error applying power plan:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Function to list files in the "files" directory with specific extension
  listFiles: (extension) => {
    try {
      const filesDir = path.join(process.cwd(), 'files');
      // Create the directory if it doesn't exist
      if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir, { recursive: true });
      }
      
      const files = fs.readdirSync(filesDir);
      return files.filter(file => file.endsWith(extension));
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  },
  
  // Window control functions
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window')
});
