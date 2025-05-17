declare global {
  interface Window {
    electron: {
      get: (storeName: string, defaultValue?: any) => Promise<any>;
      set: (storeName: string, value: any) => Promise<void>;
      uploadFile: () => Promise<string | null>;
      getFile: (fileName: string) => Promise<string | null>;
      deleteFile: (fileName: string) => Promise<void>;
      goBack: () => Promise<void>;
      goForward: () => Promise<void>;
      openNewWindow: (path: string) => void;
      loadZipData: () => Promise<{ success: boolean; message?: string }>;
      exportZipData: () => Promise<{
        success: boolean;
        filePath?: string;
        message?: string;
      }>;
    };
  }
}

export {};
