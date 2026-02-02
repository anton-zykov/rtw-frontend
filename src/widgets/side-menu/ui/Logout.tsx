import { useRouter } from "@tanstack/react-router";
import { Button } from "@mantine/core";
import { useUser } from "@/entities/user";

export function Logout () {
  const router = useRouter();
  const { logout } = useUser();

  const handleLogout = async () => {
    const res = await logout();
    if (res.ok) router.navigate({ to: '/login' });
  };

  return <Button onClick={handleLogout}>Выйти</Button>;
}
