import { useLocation } from '@tanstack/react-router';

export function SideMenu () {
  const location = useLocation();

  return <div>{location.pathname.split('/')[1]}</div>;
}
