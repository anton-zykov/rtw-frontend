import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';
import '@mantine/core/styles.css';
import '@/shared/styles/index.css';

interface StylesProvidersProps {
  children: ReactNode;
}

export function StylesProviders ({ children }: StylesProvidersProps) {
  return (
    <MantineProvider>
      {children}
    </MantineProvider>
  );
}
