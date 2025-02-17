declare global {
  interface Window {
    electron: {
      get: (storeName: string, defaultValue?: any) => Promise<any>;
      set: (storeName: string, value: any) => Promise<void>;
      selectFile: () => Promise<string | null>;
      getFilePath: (fileName: string) => Promise<string | null>;
    };
  }
}

export {};
