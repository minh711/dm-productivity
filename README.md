# How to run 🚀

## Development mode

First, switch mode in `electron-main.js`:

from:

```js
// Dev mode
// mainWindow.loadURL('http://localhost:7329');

// Production mode
mainWindow.loadFile('./dist/index.html');
```

to:

```js
// Dev mode
mainWindow.loadURL('http://localhost:7329');

// Production mode
// mainWindow.loadFile('./dist/index.html');
```

Then run the app in development mode:

```bash
npm run start:electron
```

## Deployment

Build the **Vite** frontend:

```bash
npm run build
```

Build the **Electron** app:

```bash
npm run build:electron
```

Looking for folder `dist` after the build.
