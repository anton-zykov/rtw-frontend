import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected')({
  component: AuthComponent,
});

function AuthComponent () {
  return <Outlet />;
}
