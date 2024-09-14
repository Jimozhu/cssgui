import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StyleEditor } from './StyleEditor';

function App() {
  return (
    <>
      <StyleEditor />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
