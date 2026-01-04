import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/admin')({
  component: AdminComponent,
});

function AdminComponent () {
  const { user } = Route.useRouteContext();
  console.log(user);
  return (
    <>
      <div className="p-2">/admin</div>
      <Outlet />
    </>
  );
}
