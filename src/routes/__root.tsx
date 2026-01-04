import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Providers } from '@/shared/providers/Providers';
import { SideMenu } from '@/features/sideMenu';
import styles from './__root.module.css';

export const Route = createRootRoute({ component: RootComponent });

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
