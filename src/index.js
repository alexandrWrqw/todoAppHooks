import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './Components/App/App';

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
