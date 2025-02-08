import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import './styles/index';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
