# 🏗️ Vite template

👉 Access [here](https://github.com/minh711/vite_template).

Made by [**minh711**](https://github.com/minh711) (can also be called [**dm711**](https://github.com/minh711)).

## 🪴 How to use this template

Before starting, search for `vite-template` (`Ctrl` + `Shift` + `F`) then rename it with your project name.

![image](https://github.com/user-attachments/assets/2bd5300b-42c4-4276-925f-f1783d8f056b)

Then `npm i` as ussual.

## 📚 Folder Structure

1. **`api/`** – Handles API connection logic.
2. **`assets/`** – Stores static assets (images, icons, etc.).
3. **`components/`** – Contains reusable global components.
4. **`constants/`** – Defines global constants for the project.
5. **`hooks/`** – Stores custom React hooks for shared functionality.
6. **`i18n/`** – Manages translation logic (if needed).
7. **`layouts/`** – Contains global layout components.
8. **`locales/`** – Holds translation files for `i18n` (if used).
9. **`pages/`** – Stores all individual pages of the application.
10. **`routes/`** – Defines application routes.
11. **`style/`** – Contains global CSS styles.

## 🚀 Run the project

Don't forget to install packages first

```bash
npm i
```

Then, just run it 😌

```bash
npm run dev
```

You can change the running port via `.env`.

## 🎨 What’s Included in This Template?

1. **🔒 Authorization (Optional)**

   - This template comes with a built-in authorization system.
   - If you need authentication and role-based access, it’s ready to use.
   - If you don’t need authorization, the template still works seamlessly without it.

2. **🌍 Internationalization (i18n) Ready**

   - `i18next` is set up for translations, making it easy to support multiple languages.
   - Currently, it’s commented out, so you can enable it when needed.

3. **🎨 Ant Design for UI Components**

   - The template leverages **Ant Design** to speed up development with prebuilt UI components.
   - It provides a clean and consistent design out of the box.

4. **🎭 Global CSS Utilities**
   - A set of common CSS utility classes is included for quick styling.
   - Check `general.css` to see the available styles and how to use them.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
