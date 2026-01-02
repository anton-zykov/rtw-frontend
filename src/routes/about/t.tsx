import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about/t')({
  component: RouteComponent,
});

function RouteComponent () {
  return <div className="p-2">Hello "/about/t"!</div>;
}
