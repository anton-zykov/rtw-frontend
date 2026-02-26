import type { APIResponse } from '@/shared/types/api';
import type { TeachersStudent } from '../types/TeachersStudent.type';
import type { UUID } from '@/shared/types/uuid';

const API_URL = import.meta.env.VITE_API_URL;

export async function getMyStudents ({ id }: { id: UUID }): Promise<APIResponse<TeachersStudent[]>> {
  try {
    const response = await fetch(`${API_URL}/teacher/my-students/${id}`, {
      credentials: 'include',
    });

    return response.ok
      ? {
          ok: true,
          data: (await response.json() as TeachersStudent[]),
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
