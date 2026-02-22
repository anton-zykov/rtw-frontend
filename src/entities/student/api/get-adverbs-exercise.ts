import type { APIResponse } from '@/shared/types/api';
import type { AdverbsTask } from '../types/AdverbsTask.type.ts';

const API_URL = import.meta.env.VITE_API_URL;

export async function getAdverbsExercise ({ id }: { id: string }): Promise<APIResponse<{ exercise: AdverbsTask[] }>> {
  try {
    const response = await fetch(`${API_URL}/adverbs-task/exercise/${id}`, {
      credentials: 'include',
    });

    return response.ok
      ? {
          ok: true,
          data: { exercise: (await response.json() as AdverbsTask[]) },
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
