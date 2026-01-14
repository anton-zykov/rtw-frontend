import { createFileRoute, redirect } from '@tanstack/react-router';
import { LoginForm } from './-ui';

export const Route = createFileRoute('/login/')({
  component: LoginComponent,
  beforeLoad: ({ context }) => {
    if (context.userStore.user !== null) return redirect({ to: '/' });
  },
});

function LoginComponent () {
  return <LoginForm />;
}
