import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Providers } from '@/app/providers';
import { SideMenu } from '@/widgets/side-menu';
import styles from './__root.module.css';
import type { RouterContext } from '@/app/context';

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootComponent });

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
