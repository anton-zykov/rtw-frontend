import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from './-ui';

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
  beforeLoad: ({ context }) => {
    if (context.user.details !== null) return redirect({ to: '/' });
  },
});

function LoginComponent () {
  return <LoginForm />;
}
