import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/learn')({
  component: LearnComponent,
  beforeLoad: ({ context }) => {
    if (context.userStore.user?.role !== 'student') {
      redirect({ to: '/', throw: true });
    }
  },
});

function LearnComponent () {
  return (
    <>
      <div className="p-2">/learn</div>
      <Outlet />
    </>
  );
}
