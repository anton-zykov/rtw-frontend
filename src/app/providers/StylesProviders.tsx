import { Radio, createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/shared/styles/index.css';
import classes from './classes.module.css';

interface StylesProvidersProps {
  children: ReactNode;
}

const theme = createTheme({
  components: {
    'Radio.Card': Radio.Card.extend({
      classNames: classes,
    }),
  },
});

export function StylesProviders ({ children }: StylesProvidersProps) {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
}
