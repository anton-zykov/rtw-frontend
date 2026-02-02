import { RouterProvider } from '@tanstack/react-router';
import { router } from '../router/router';
import { useUser } from '@/entities/user';

export function RouterWithContext () {
  const user = useUser();

  // const prevDetailsRef = useRef(user.details);
  
  // Invalidate router when user details change to recompute context
  // useEffect(() => {
  //   if (prevDetailsRef.current !== user.details) {
  //     prevDetailsRef.current = user.details;
  //     router.invalidate();
  //   }
  // }, [user.details]);
  
  return (
    <RouterProvider router={router} context={{ user }} />
  );
}
