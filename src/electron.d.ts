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
      selectMusicFolder: () => Promise<
        Array<{
          path: string;
          metadata: {
            artist: string | null;
            album: string | null;
            title: string;
            picture: string | null; // base64 data URL or null
          };
        }>
      >;
      readMusicFile: (filePath: string) => Promise<string | null>;
    };
  }
}

export {};
