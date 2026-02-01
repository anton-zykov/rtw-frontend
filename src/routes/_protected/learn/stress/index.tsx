import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/learn/stress/')({
  component: StressIndexComponent,
});

function StressIndexComponent () {
  return <div>Hello "/_protected/learn/stress/"!</div>;
}
