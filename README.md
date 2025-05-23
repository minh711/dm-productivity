# 🍇 DM Productivity

## ℹ️ How to run

### 💻 Development mode

First, switch mode in `electron-main.js`:

```js
// Change to false to build for production
const isDevMode = true;
```

Then run the app in development mode:

```bash
npm run start:electron
```

### 🚀 Deployment

#### 1. Build the **Vite** frontend

```bash
npm run build
```

#### 2. Build the **Electron** app

```bash
npm run build:electron
```

Looking for folder `dist` after the build.

## 🐞 Bug logs

### Menu item right click

Since this app is deployed in **Electron**, users don't have the option to
right-click and select "Open in new tab" like they would in a browser. To mimic
that behavior, I implemented a custom context menu using the `<DmLink>`
component.

However, when applying `<DmLink>` to an **Ant Design** `<Menu.Item>`, it only
wraps the label and icon — not the entire menu item. As a result, the
right-click functionality only works on the label and icon, not the whole menu
item.

I'm not sure how to configure **Ant Design** to make the entire menu item
trigger the context menu.
