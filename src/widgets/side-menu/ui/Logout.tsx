import { useRouter } from '@tanstack/react-router';
import { Button } from '@mantine/core';
import { useUser } from '@/entities/user';

export function Logout () {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = () => {
    logout().then(res => {
      if (res.ok) void router.navigate({ to: '/login' });
    }).catch((err: unknown) => {
      console.error(err);
    });
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
}
