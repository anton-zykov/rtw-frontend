import type { APIResponse } from '@/shared/types/api';
import type { UUID } from '@/shared/types/uuid';
import type { TaskType } from '@/shared/types/TaskType.type';

const API_URL = import.meta.env.VITE_API_URL;

interface UpdateTaskTypesParams {
  studentId: UUID;
  taskTypes: TaskType[];
}

export async function updateTaskTypes ({ studentId, taskTypes }: UpdateTaskTypesParams): Promise<APIResponse<void>> {
  try {
    const response = await fetch(`${API_URL}/student/update-task-types`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ studentId, taskTypes }),
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
