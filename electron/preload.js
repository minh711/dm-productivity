const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  get: (storeName, defaultValue) =>
    ipcRenderer.invoke('store:get', storeName, defaultValue),
  set: (storeName, value) => ipcRenderer.invoke('store:set', storeName, value),
  selectFile: () => ipcRenderer.invoke('select-file'),
  getFilePath: (fileName) => ipcRenderer.invoke('get-file-path', fileName),
});
