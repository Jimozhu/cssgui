import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Demo } from './Demo';

function App() {
  return (
    <>
      <Demo />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
