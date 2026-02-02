import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProvidersWithRouter } from '@/app';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ProvidersWithRouter />
    </StrictMode>
  );
}
