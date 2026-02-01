import type { APIResponse } from '@/shared/types/api';
import type { GenitiveTask } from '../types/GenitiveTask.type.ts';

const API_URL = import.meta.env.VITE_API_URL;

export async function getGenitiveExercise ({ id }: { id: string }): Promise<APIResponse<{ exercise: GenitiveTask[] }>> {
  try {
    const response = await fetch(`${API_URL}/genitive-task/exercise/${id}`, {
      credentials: 'include',
    });

    return response.ok
      ? {
          ok: true,
          data: { exercise: (await response.json() as GenitiveTask[]) },
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
