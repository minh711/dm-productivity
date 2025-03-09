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
    };
  }
}

export {};
