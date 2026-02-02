import type { useUser } from '@/entities/user';

export interface RouterContext {
  user: ReturnType<typeof useUser>;
}

export const context = {
  user: undefined!,
} satisfies RouterContext;
