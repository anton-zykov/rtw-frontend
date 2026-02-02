import { useUser } from '@/entities/user';
import { Logout } from './Logout';

export function SideMenu () {
  const { details } = useUser();
  
  return (
    <>
      <div>Добро пожаловать {details?.id}</div>
      <Logout />
    </>
  );
}
