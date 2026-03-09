import type { APIResponse } from '@/shared/types/api';
import type { UUID } from '@/shared/types/UUID';

const API_URL = import.meta.env.VITE_API_URL;

interface UpdateStudentsAgeParams {
  studentId: UUID;
  age: number;
}

export async function updateStudentsAge ({ studentId, age }: UpdateStudentsAgeParams): Promise<APIResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/student/increase-age-and-assign-tricky`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, age }),
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
