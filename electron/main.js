const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(async () => {
  // Dynamically import the electron-store module (since it's an ES module)
  const Store = (await import('electron-store')).default;

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:7329'); // Vite dev server

  // Test - Create stores for settings, logs, and user data
  const settingsStore = new Store({ name: 'settings' });
  const logsStore = new Store({ name: 'logs' });
  const userStore = new Store({ name: 'user-data' });

  // Add data to each store
  settingsStore.set('theme', 'dark');
  settingsStore.set('language', 'en');
  settingsStore.set('notificationsEnabled', true);

  logsStore.set('lastLogin', '2025-02-10');
  logsStore.set('errorLogs', [
    'Error: Something went wrong',
    'Warning: Low memory',
  ]);

  userStore.set('username', 'john_doe');
  userStore.set('email', 'john.doe@example.com');
  userStore.set('preferences', { theme: 'dark', language: 'en' });
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
        nodeIntegration: true,
      },
    });
    mainWindow.loadURL('http://localhost:7329');
  }
});
