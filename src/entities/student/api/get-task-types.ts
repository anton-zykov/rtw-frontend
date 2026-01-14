import type { APIResponse } from '@/shared/types/api';
import type { TaskType } from '../types/TaskType.type';

const API_URL = import.meta.env.VITE_API_URL;

interface GetTaskTypesData {
  taskTypes: Set<TaskType>;
}

export async function getTaskTypes ({ id }: { id: string }): Promise<APIResponse<GetTaskTypesData>> {
  try {
    const res = await fetch(`${API_URL}/student/get-task-types/${id}`, {
      credentials: 'include',
    });

    return res.ok
      ? {
          ok: true,
          data: { taskTypes: new Set((await res.json() as { taskTypes: TaskType[] }).taskTypes) } as GetTaskTypesData,
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
