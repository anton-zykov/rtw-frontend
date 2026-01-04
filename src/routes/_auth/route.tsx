import { createFileRoute, Outlet } from '@tanstack/react-router';

interface AuthContext {
  user: {
    id: number | undefined;
    role: string | undefined;
  };
}

export const Route = createFileRoute('/_auth')({
  component: AuthComponent,
  beforeLoad: (): AuthContext => {
    const user = {
      id: 1,
      role: 'admin',
    };

    return {
      user,
    };
  },
});

export function AuthComponent () {
  return <Outlet />;
}
