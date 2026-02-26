import { createContext, useCallback, useContext, useState } from 'react';
import { login as loginApi } from '../api/login';
import { logout as logoutApi } from '../api/logout';
import { me as meApi } from '../api/me';
import type { UserDetails } from '../types/UserDetails.type';

export function useUserImpl () {
  const [details, setDetails] = useState<UserDetails | null>(null);

  const refresh = useCallback(async () => {
    const res = await meApi();
    if (res.ok) setDetails(res.data);
    else setDetails(null);
    return res;
  }, []);

  const login = useCallback(async (params: { login: string; password: string }) => {
    const res = await loginApi(params);
    return res;
  }, []);

  const logout = useCallback(async () => {
    const res = await logoutApi();
    if (res.ok) setDetails(null);
    return res;
  }, []);

  const getDetails = useCallback(async () => {
    if (details !== null) return details;
    const res = await refresh();
    return res.data ?? null;
  }, [details, refresh]);

  return {
    getDetails,
    refresh,
    login,
    logout,
  };
}

type UserContextValue = ReturnType<typeof useUserImpl>;

export const UserContext = createContext<UserContextValue | null>(null);

export function useUser () {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
