const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const AdmZip = require('adm-zip');

async function loadDataFromZip(zipFilePath) {
  const zip = new AdmZip(zipFilePath);
  const zipEntries = zip.getEntries();

  const filesDir = path.join(app.getPath('userData'), 'data', 'files');
  const storesDir = path.join(app.getPath('userData'), 'data', 'stores');

  await fs.mkdir(filesDir, { recursive: true });
  await fs.mkdir(storesDir, { recursive: true });

  async function readJSONFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  // Copy files from zip/files (overwrite existing)
  for (const entry of zipEntries) {
    if (entry.entryName.startsWith('files/') && !entry.isDirectory) {
      const relativePath = entry.entryName.substring('files/'.length);
      const destPath = path.join(filesDir, relativePath);
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.writeFile(destPath, entry.getData());
    }
  }

  async function writeJSONFile(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // Merge stores from zip/stores
  for (const entry of zipEntries) {
    if (entry.entryName.startsWith('stores/') && !entry.isDirectory) {
      const relativePath = entry.entryName.substring('stores/'.length);
      const destPath = path.join(storesDir, relativePath);

      const newStoreContent = JSON.parse(entry.getData().toString('utf-8'));
      let existingContent = await readJSONFile(destPath);

      if (!existingContent) {
        await writeJSONFile(destPath, newStoreContent);
        continue;
      }

      const storeKey = Object.keys(newStoreContent)[0];

      const newArray = Array.isArray(newStoreContent[storeKey])
        ? newStoreContent[storeKey]
        : [];
      const existingArray = Array.isArray(existingContent[storeKey])
        ? existingContent[storeKey]
        : [];

      const existingMap = new Map(existingArray.map((item) => [item.id, item]));
      for (const newItem of newArray) {
        existingMap.set(newItem.id, newItem);
      }

      const mergedArray = Array.from(existingMap.values());
      const mergedContent = { [storeKey]: mergedArray };
      await writeJSONFile(destPath, mergedContent);
    }
  }
}

async function zipAndSaveData() {
  const userDataPath = app.getPath('userData');
  const storesDir = path.join(userDataPath, 'data', 'stores');
  const filesDir = path.join(userDataPath, 'data', 'files');

  const zip = new AdmZip();

  async function addFolderToZip(zip, folderPath, zipRootPath) {
    const entries = await fs.readdir(folderPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(folderPath, entry.name);
      const zipPath = path.join(zipRootPath, entry.name);
      if (entry.isDirectory()) {
        await addFolderToZip(zip, fullPath, zipPath); // recurse subfolders
      } else if (entry.isFile()) {
        const fileData = await fs.readFile(fullPath);
        zip.addFile(zipPath, fileData);
      }
    }
  }

  try {
    await addFolderToZip(zip, storesDir, 'stores');
  } catch (err) {
    console.error('Error adding stores to zip:', err);
  }

  try {
    await addFolderToZip(zip, filesDir, 'files');
  } catch (err) {
    console.error('Error adding files to zip:', err);
  }

  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Save Data Backup',
    defaultPath: path.join(userDataPath, 'data-backup.zip'),
    filters: [{ name: 'Zip Files', extensions: ['zip'] }],
  });

  if (canceled || !filePath) {
    return { success: false, message: 'Save cancelled' };
  }

  try {
    zip.writeZip(filePath);
    return { success: true, filePath };
  } catch (err) {
    console.error('Error writing zip file:', err);
    return { success: false, message: err.message };
  }
}

let mainWindow;

app.whenReady().then(async () => {
  // ===================== Initialize stores =====================
  // Stores are stored in folder %APPDATA%/dm-productivity/data/stores

  const { default: Store } = await import('electron-store');
  const storePath = path.join(app.getPath('userData'), 'data', 'stores');
  try {
    await fs.mkdir(storePath, { recursive: true });
  } catch (error) {
    console.error('Error creating store directory:', error);
  }
  // ===================== End initialize stores =====================

  // ===================== IPC Handlers for store operations =====================
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
  // ===================== End IPC Handlers for store operations =====================

  // ===================== IPC Handlers for file operations =====================
  // Files are stored in folder %APPDATA%/dm-productivity/data/files

  ipcMain.handle('upload-file', async (event, selectedFilePath) => {
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

    const basePath = path.join(app.getPath('userData'), 'data', 'files');
    let filePath;

    if (fileName.startsWith('/')) {
      const segments = fileName.slice(1).split('/');
      filePath = path.join(basePath, ...segments);
    } else {
      filePath = path.join(basePath, fileName);
    }

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
  // ===================== End IPC Handlers for file operations =====================

  // ===================== IPC Handlers for data backup =====================
  ipcMain.handle('load-zip-data', async (event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [{ name: 'Zip Files', extensions: ['zip'] }],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return { success: false, message: 'No file selected' };
    }

    const zipPath = result.filePaths[0];

    try {
      await loadDataFromZip(zipPath);
      return { success: true };
    } catch (error) {
      console.error('Failed to load zip data:', error);
      return { success: false, message: error.message };
    }
  });

  ipcMain.handle('export-zip-data', async () => {
    return await zipAndSaveData();
  });
  // ===================== End IPC Handlers for data backup =====================

  // ===================== IPC Handlers for window operations =====================
  ipcMain.on('go-back', (event) => {
    const senderWebContents = event.sender;
    if (senderWebContents.navigationHistory.canGoBack()) {
      senderWebContents.navigationHistory.goBack();
    }
  });

  ipcMain.on('go-forward', (event) => {
    const senderWebContents = event.sender;
    if (senderWebContents.navigationHistory.canGoForward()) {
      senderWebContents.navigationHistory.goForward();
    }
  });

  ipcMain.on('open-new-window', (event, routePath) => {
    const newWin = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    // $$ Dev mode $$
    const newRoutePath = routePath.replace(/\//, '#');
    newWin.loadURL(`http://localhost:7329/${newRoutePath}`);

    // $$ Production mode $$
    // newWin.loadFile(path.join('dist/index.html'), {
    //   hash: routePath,
    // });
  });
  // ===================== IPC Handlers for window operations =====================

  // ===================== Music Player module =====================
  let parseFile;
  const sharp = require('sharp');
  ipcMain.handle('select-music-folder', async () => {
    if (!parseFile) {
      ({ parseFile } = await import('music-metadata'));
    }

    const result = await dialog.showOpenDialog({
      properties: ['openDirectory'],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return [];
    }

    const selectedFolder = result.filePaths[0];
    const files = await fs.readdir(selectedFolder);
    const musicFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === '.mp3'
    );

    const appFolder = path.join(app.getPath('userData'), 'data');
    const filesFolder = path.join(appFolder, 'files', 'music');
    const storePath = path.join(appFolder, 'stores');
    const storeFile = path.join(storePath, 'music.json');

    await fs.mkdir(filesFolder, { recursive: true });
    await fs.mkdir(storePath, { recursive: true });

    const results = [];

    for (const file of musicFiles) {
      const fullPath = path.join(selectedFolder, file);
      try {
        const metadata = await parseFile(fullPath);
        let picturePath = null;

        console.log(metadata);

        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const pic = metadata.common.picture[0];
          const ext = pic.format.includes('jpeg') ? '.jpg' : '.png';
          const uniqueFileBase = uuidv4();

          picturePath = `/music/${uniqueFileBase}${ext}`;
          thumbnailPath = `/music/${uniqueFileBase}_thumbnail${ext}`;

          await fs.writeFile(
            path.join(filesFolder, `${uniqueFileBase}${ext}`),
            pic.data
          );

          const thumbnailBuffer = await sharp(pic.data)
            .resize(128, 128, { fit: 'cover' })
            .toBuffer();

          await fs.writeFile(
            path.join(filesFolder, `${uniqueFileBase}_thumbnail${ext}`),
            thumbnailBuffer
          );
        }

        results.push({
          path: fullPath,
          metadata: {
            artist: metadata.common.artist || null,
            album: metadata.common.album || null,
            title: metadata.common.title || file,
            picture: picturePath,
            thumbnail: thumbnailPath,
          },
        });
      } catch {
        results.push({
          path: fullPath,
          metadata: {
            artist: null,
            album: null,
            title: file,
            picture: null,
            thumbnail: null,
          },
        });
      }
    }

    await fs.writeFile(
      storeFile,
      JSON.stringify({ music: results }, null, 2),
      'utf-8'
    );
    return results;
  });
  // ===================== End Music Player module =====================

  // ===================== Initialize main window =====================
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  // ===================== End initialize main window =====================

  // $$ Dev mode $$
  mainWindow.loadURL('http://localhost:7329');

  // $$ Production mode $$
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
      width: 1600,
      height: 900,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: false,
      },
    });

    // $$ Dev mode $$
    mainWindow.loadURL('http://localhost:7329');

    // $$ Production mode $$
    // mainWindow.loadFile('./dist/index.html');
  }
});
