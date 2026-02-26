// import { useUser } from '@/entities/user';
import { Logout } from './Logout';

export function SideMenu () {
  // const { getDetails } = useUser();
  // const details = await getDetails();
  return (
    <>
      <div>Добро пожаловать</div>
      <Logout />
    </>
  );
}
