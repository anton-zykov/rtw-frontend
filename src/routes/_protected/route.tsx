import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  component: AuthComponent,
  beforeLoad: async ({ context }) => {
    if (context.userStore.user === null) {
      if (await context.userStore.refresh() === null) {
        redirect({ to: '/login', throw: true });
      }
    }
  },
});

function AuthComponent () {
  return <Outlet />;
}
