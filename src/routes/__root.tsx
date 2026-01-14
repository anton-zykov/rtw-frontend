import { createRootRouteWithContext, Outlet, redirect, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Providers } from '@/app/providers';
import { SideMenu } from '@/widgets/side-menu';
import { AppShell, Burger, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import styles from './__root.module.css';
import type { RouterContext } from '@/app/context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    if (context.userStore.user === null) {
      const res = await context.userStore.refresh();
      if (!res.ok && location.pathname !== '/login') {
        return redirect({ to: '/login', throw: true });
      }
    }
  },
});

function RootComponent () {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <Providers>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened, desktop: location.pathname === '/login' }
        }}
      >
        <AppShell.Header>
          <Flex p="md" h="100%" align="center" gap="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Text>Remember The Words</Text>
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar>
          <SideMenu />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      <TanStackRouterDevtools />
    </Providers>
  );
}
