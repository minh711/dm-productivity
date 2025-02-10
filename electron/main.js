const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(async () => {
  // Dynamically import the electron-store module (since it's an ES module)
  const { default: Store } = await import('electron-store');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Ensure context isolation is enabled for security
      nodeIntegration: false, // Disable nodeIntegration for renderer security
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:7329'); // Vite dev server

  // Initialize stores
  const logTypesStore = new Store({ name: 'logTypes' });

  logTypesStore.set('logTypes', []);

  // IPC Handlers for electron-store operations
  ipcMain.handle('store:get', (event, key, defaultValue) => {
    return new Store().get(key, defaultValue);
  });

  ipcMain.handle('store:set', (event, key, value) => {
    new Store().set(key, value);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });
    mainWindow.loadURL('http://localhost:7329');
  }
});
