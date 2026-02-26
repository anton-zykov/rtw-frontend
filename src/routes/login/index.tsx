import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from './-ui';

export const Route = createFileRoute('/login/')({
  component: LoginComponent
});

function LoginComponent () {
  return <LoginForm />;
}
