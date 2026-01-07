import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Providers } from '@/app/providers';
import { SideMenu } from '@/widgets/side-menu';
import styles from './__root.module.css';
import type { RouterContext } from '@/app/context';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  beforeLoad: async ({ context }) => {
    if (context.userStore.user === null) {
      const res = await context.userStore.refresh();
      if (!res.ok && location.pathname !== '/login') {
        redirect({ to: '/login', throw: true });
      }
    }
  },
});

function RootComponent () {
  return (
    <Providers>
      <div className={styles.page}>
        <SideMenu />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </Providers>
  );
}
