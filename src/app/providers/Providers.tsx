import type { ReactNode } from 'react';
import { StylesProviders } from './StylesProviders';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers ({ children }: ProvidersProps) {
  return (
    <StylesProviders>
      {children}
    </StylesProviders>
  );
}
