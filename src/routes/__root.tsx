import { createRootRouteWithContext, Outlet, redirect, useLocation } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { SideMenu } from '@/widgets/side-menu';
import { AppShell, Burger, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import styles from './__root.module.css';
import type { RouterContext } from '@/app';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    const details = await context.user.getDetails();
    if (!details && location.pathname !== '/login') {
      return redirect({ to: '/login', throw: true });
    }
    if (details) {
      const currentSubpath = location.pathname.split('/')[1];
      switch (details.role) {
        case 'admin':
          if (currentSubpath !== 'admin') return redirect({ to: '/admin', throw: true });
          break;
        case 'teacher':
          if (currentSubpath !== 'teacher') return redirect({ to: '/teacher', throw: true });
          break;
        case 'student':
          if (currentSubpath !== 'learn') return redirect({ to: '/learn/select-task', throw: true });
          break;
      }
    }
  },
});

function RootComponent () {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <>
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
    </>
  );
}
