import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/learn/select-task')({
  component: SelectTaskComponent,
});

function SelectTaskComponent () {
  return <div>Hello "/select-task"!</div>;
}
