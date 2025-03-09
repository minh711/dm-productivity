const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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

  // IPC Handlers for electron-store operations
  ipcMain.handle('store:get', async (event, storeName, defaultValue) => {
    const { default: Store } = await import('electron-store');
    const storeFilePath = path.join(storePath, `${storeName}.json`);

    try {
      await fs.access(storeFilePath); // Check if store file exists
    } catch {
      new Store({ name: storeName, cwd: storePath }).set(
        storeName,
        defaultValue
      );
    }

    const store = new Store({ name: storeName, cwd: storePath });
    return store.get(storeName, defaultValue);
  });

  ipcMain.handle('store:set', async (event, storeName, value) => {
    const { default: Store } = await import('electron-store');
    const storeFilePath = path.join(storePath, `${storeName}.json`);

    try {
      await fs.access(storeFilePath); // Check if store file exists
    } catch {
      new Store({ name: storeName, cwd: storePath }).set(
        storeName,
        defaultValue
      );
    }

    const store = new Store({ name: storeName, cwd: storePath });
    store.set(storeName, value);
  });

  ipcMain.handle('upload-file', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
    });

    if (result.filePaths.length > 0) {
      const selectedFilePath = result.filePaths[0];

      const appFolder = path.join(app.getPath('userData'), 'data', 'files');
      await fs.mkdir(appFolder, { recursive: true });

      const ext = path.extname(selectedFilePath); // Get file extension
      const uniqueFileName = `${uuidv4()}${ext}`; // Generate unique filename
      const destinationPath = path.join(appFolder, uniqueFileName);

      await fs.copyFile(selectedFilePath, destinationPath);

      return uniqueFileName;
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

  ipcMain.handle('delete-file', async (event, fileName) => {
    const fs = require('fs').promises;

    const filePath = path.join(
      app.getPath('userData'),
      'data',
      'files',
      fileName
    );

    try {
      await fs.access(filePath); // Check if file exists
      await fs.unlink(filePath); // Delete the file
      return true; // Success
    } catch (error) {
      console.error('Error deleting file:', error);
      return false; // Failure
    }
  });

  ipcMain.on('go-back', () => {
    if (mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack();
    }
  });

  ipcMain.on('go-forward', () => {
    if (mainWindow.webContents.canGoForward()) {
      mainWindow.webContents.goForward();
    }
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
