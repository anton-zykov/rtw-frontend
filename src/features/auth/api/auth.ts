import type { APIResponse } from '@/shared/types/api';

interface AuthParams {
  login: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL;

interface LoginData {
  role: string;
}

export async function login ({ login, password }: AuthParams): Promise<APIResponse<LoginData>> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ login, password }),
    });

    return res.ok
      ? {
          ok: true,
          data: await res.json() as LoginData,
        }
      : {
          ok: false,
          message: (await res.json() as { message: string }).message,
        };
  } catch (e) {
    return {
      ok: false,
      message: 'Неизвестная ошибка',
    };
  }
}
