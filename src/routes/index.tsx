import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
  beforeLoad: ({ context }) => {
    if (context.user.details === null) return redirect({ to: '/login' });
    else if (context.user.details.role === 'student') return redirect({ to: '/learn' });
    else if (context.user.details.role === 'teacher') return redirect({ to: '/teacher' });
    else if (context.user.details.role === 'admin') return redirect({ to: '/admin' });
  },
});

function IndexComponent () {
  return <div>Hello "/"!</div>;
}
