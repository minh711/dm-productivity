const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  get: (storeName, defaultValue) =>
    ipcRenderer.invoke('store:get', storeName, defaultValue),
  set: (storeName, value) => ipcRenderer.invoke('store:set', storeName, value),
  uploadFile: () => ipcRenderer.invoke('upload-file'),
  getFile: (fileName) => ipcRenderer.invoke('get-file', fileName),
  deleteFile: (fileName) => ipcRenderer.invoke('delete-file', fileName),
  goBack: () => ipcRenderer.send('go-back'),
  goForward: () => ipcRenderer.send('go-forward'),
});
