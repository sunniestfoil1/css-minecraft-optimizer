
interface SystemInfo {
  osVersion: string;
  platform: string;
  hostname: string;
  totalMemory: number;
  freeMemory: number;
}

interface ExecutionResult {
  success: boolean;
  error?: string;
}

interface ElectronAPI {
  getSystemInfo: () => SystemInfo;
  runExecutable: (exeName: string) => ExecutionResult;
  runBatchFile: (batName: string) => ExecutionResult;
  runPowerPlan: (powName: string) => ExecutionResult;
  listFiles: (extension: string) => string[];
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
}

interface Window {
  electron?: ElectronAPI;
}
