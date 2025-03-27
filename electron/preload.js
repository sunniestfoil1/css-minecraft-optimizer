
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Function to run .exe files
  runExecutable: (exeName) => {
    const filePath = path.join(process.cwd(), 'files', exeName);
    console.log(`Attempting to run: ${filePath}`);
    
    // In a real app, this would execute the actual .exe file
    // For now, we just log that we would run it
    console.log(`Would run ${exeName} if this was a real desktop app`);
    return true;
  },
  
  // Function to run .bat files
  runBatchFile: (batName) => {
    const filePath = path.join(process.cwd(), 'files', batName);
    console.log(`Attempting to run batch file: ${filePath}`);
    
    // In a real app, this would execute the actual .bat file
    console.log(`Would run ${batName} if this was a real desktop app`);
    return true;
  },
  
  // Function to list files in the "files" directory
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
  }
});
