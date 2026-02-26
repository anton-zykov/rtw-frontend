import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/admin')({
  component: AdminComponent
});

function AdminComponent () {
  return (
    <>
      <div className="p-2">/admin</div>
      <Outlet />
    </>
  );
}
