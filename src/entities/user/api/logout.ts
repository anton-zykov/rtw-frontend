import type { APIResponse } from '@/shared/types/api';

const API_URL = import.meta.env.VITE_API_URL;

export async function logout (): Promise<APIResponse<undefined>> {
  try {
    const res = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    return res.ok
      ? {
          ok: true,
          data: undefined,
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
