import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/learn/select-task')({
  component: SelectTaskComponent,
});

function SelectTaskComponent () {
  return <div>Hello "/select-task"!</div>;
}
