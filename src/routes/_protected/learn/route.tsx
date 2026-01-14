import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/learn')({
  component: LearnComponent,
  beforeLoad: ({ context }) => {
    if (context.userStore.user?.role !== 'student') redirect({ to: '/', throw: true });
    else if (location.pathname === '/learn') return redirect({ to: '/learn/select-task' });
  },
});

function LearnComponent () {
  return (
    <Outlet />
  );
}
