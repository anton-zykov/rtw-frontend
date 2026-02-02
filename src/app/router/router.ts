import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { context } from '../context/context';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export const router = createRouter({
  routeTree,
  context,
});
