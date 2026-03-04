import type { APIResponse } from '@/shared/types/api';
import type { UUID } from '@/shared/types/UUID';

const API_URL = import.meta.env.VITE_API_URL;

interface UpdateStudentParams {
  studentId: UUID;
  login?: string;
  fullName?: string;
  telegramId?: string;
}

export async function updateStudent ({ studentId, login, fullName, telegramId }: UpdateStudentParams): Promise<APIResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/user/update-student`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, login, fullName, telegramId }),
    });

    return response.ok
      ? {
          ok: true,
          data: undefined,
        }
      : {
          ok: false,
          message: (await response.json() as { message: string }).message,
        };
  } catch (e) {
    return {
      ok: false,
      message: 'Неизвестная ошибка',
    };
  }
}
