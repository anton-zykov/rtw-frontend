import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/admin')({
  component: AdminComponent,
  beforeLoad: ({ context }) => {
    if (context.userStore.user?.role !== 'admin') {
      redirect({ to: '/', throw: true });
    }
  },
});

function AdminComponent () {
  return (
    <>
      <div className="p-2">/admin</div>
      <Outlet />
    </>
  );
}
