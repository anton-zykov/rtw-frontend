import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
  beforeLoad: ({ context }) => {
    if (context.userStore.user === null) return redirect({ to: '/login' });
    else if (context.userStore.user.role === 'student') return redirect({ to: '/learn' });
    else if (context.userStore.user.role === 'teacher') return redirect({ to: '/teacher' });
    else if (context.userStore.user.role === 'admin') return redirect({ to: '/admin' });
  },
});

function IndexComponent () {
  return <div>Hello "/"!</div>;
}
