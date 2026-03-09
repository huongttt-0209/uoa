import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import './shared/styles/design-tokens.css';
import './shared/styles/globals.css';
import './shared/styles/animations.css';
import { App } from './App.tsx';

inject();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
