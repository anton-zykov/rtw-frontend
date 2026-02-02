import type { ReactNode } from 'react';
import { UserContext, useUserImpl } from '@/entities/user';

export function UserProvider ({ children }: { children: ReactNode }) {
  const user = useUserImpl();
  
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

