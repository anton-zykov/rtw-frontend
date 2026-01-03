import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/select-task')({
  component: SelectTask,
});

function SelectTask () {
  return <div>Hello "/select-task"!</div>;
}
