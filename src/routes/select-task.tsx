import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/select-task')({
  component: RouteComponent,
});

function RouteComponent () {
  return <div>Hello "/select-task"!</div>;
}
