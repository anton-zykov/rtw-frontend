import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin-panel')({
  component: AdminPanel,
});

function AdminPanel () {
  return <div>Hello "/admin-panel"!</div>;
}
