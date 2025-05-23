# ℹ️ How to run

## 💻 Development mode

First, switch mode in `electron-main.js`:

```js
// Change to false to build for production
const isDevMode = true;
```

Then run the app in development mode:

```bash
npm run start:electron
```

## 🚀 Deployment

### 1. Build the **Vite** frontend

```bash
npm run build
```

### 2. Build the **Electron** app

```bash
npm run build:electron
```

Looking for folder `dist` after the build.
