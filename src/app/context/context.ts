import { UserStore } from '@/entities/user';

export interface RouterContext {
  userStore: UserStore;
}

export const context = {
  userStore: new UserStore(),
} satisfies RouterContext;
