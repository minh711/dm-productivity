const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs').promises;
const path = require('path');

let mainWindow;

app.whenReady().then(async () => {
  // Initialize stores
  const { default: Store } = await import('electron-store');
  const storePath = path.join(app.getPath('userData'), 'data', 'stores');
  try {
    await fs.mkdir(storePath, { recursive: true });
  } catch (error) {
    console.error('Error creating store directory:', error);
  }

  const stores = {
    logTypes: new Store({ name: 'logTypes', cwd: storePath }),
    logCategories: new Store({ name: 'logCategories', cwd: storePath }),
    settings: new Store({ name: 'settings', cwd: storePath }),
  };
  stores.logTypes.set([], []);
  stores.logCategories.set([], []);
  stores.settings.set([], []);

  // IPC Handlers for electron-store operations
  ipcMain.handle('store:get', (event, storeName, defaultValue) => {
    const store = stores[storeName];
    return store ? store.get(storeName, defaultValue) : defaultValue;
  });

  ipcMain.handle('store:set', (event, storeName, value) => {
    const store = stores[storeName];
    if (store) {
      store.set(storeName, value);
    }
  });

  ipcMain.handle('upload-file', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
    });

    if (result.filePaths.length > 0) {
      const selectedFilePath = result.filePaths[0];

      const appFolder = path.join(app.getPath('userData'), 'data', 'files');
      const fileName = path.basename(selectedFilePath);
      const destinationPath = path.join(appFolder, fileName);

      await fs.mkdir(appFolder, { recursive: true });
      await fs.copyFile(selectedFilePath, destinationPath);

      return destinationPath;
    }

    return null;
  });

  ipcMain.handle('get-file', async (event, fileName) => {
    const fs = require('fs');

    const filePath = path.join(
      app.getPath('userData'),
      'data',
      'files',
      fileName
    );
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');

    return base64Data;
  });

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);

  // Dev mode
  mainWindow.loadURL('http://localhost:7329');

  // Production mode
  // mainWindow.loadFile('./dist/index.html');
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
        // preload: './dist/preload.js',
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    // Dev mode
    mainWindow.loadURL('http://localhost:7329');

    // Production mode
    // mainWindow.loadFile('./dist/index.html');
  }
});
