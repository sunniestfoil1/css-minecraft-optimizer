
interface ElectronAPI {
  runExecutable: (exeName: string) => boolean;
  runBatchFile: (batName: string) => boolean;
  listFiles: (extension: string) => string[];
  minimizeWindow?: () => void;
  maximizeWindow?: () => void;
  closeWindow?: () => void;
}

interface Window {
  electron?: ElectronAPI;
}
