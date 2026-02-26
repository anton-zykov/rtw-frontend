import type { TaskType } from "@/shared/types/TaskType.type";
import type { UUID } from "@/shared/types/uuid";

export interface TeachersStudent {
  id: UUID;
  login: string;
  active: boolean;
  fullName: string | null;
  email: string | null;
  telegramId: string | null;
  taskTypes: Set<TaskType>;
}
