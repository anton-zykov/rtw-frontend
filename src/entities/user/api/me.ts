import type { APIResponse } from '@/shared/types/api';

const API_URL = import.meta.env.VITE_API_URL;

interface MeData {
  id: string;
  role: string;
}

export async function me (): Promise<APIResponse<MeData>> {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      credentials: 'include',
    });

    return res.ok
      ? {
          ok: true,
          data: await res.json() as MeData,
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
