declare global {
  interface Window {
    electron: {
      get: (key: string, defaultValue?: any) => Promise<any>;
      set: (key: string, value: any) => Promise<void>;
    };
  }
}

export {};
