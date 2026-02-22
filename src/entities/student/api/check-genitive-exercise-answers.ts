import type { APIResponse } from '@/shared/types/api';
import type { UUID } from '@/shared/types/uuid';

const API_URL = import.meta.env.VITE_API_URL;

interface CheckGenitiveExerciseAnswersParams {
  userId: UUID;
  exercise: {
    taskId: UUID;
    answer: string;
  }[];
}

interface CheckGenitiveExerciseAnswersData {
  checkedTasks: {
    taskId: UUID;
    correct: boolean;
  }[];
}

export async function checkGenitiveExerciseAnswers ({ userId, exercise }: CheckGenitiveExerciseAnswersParams): Promise<APIResponse<CheckGenitiveExerciseAnswersData>> {
  try {
    const response = await fetch(`${API_URL}/genitive-task/exercise/check`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        exercise,
      }),
    });

    return response.ok
      ? {
          ok: true,
          data: { checkedTasks: (await response.json() as { taskId: UUID, correct: boolean }[]) },
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
