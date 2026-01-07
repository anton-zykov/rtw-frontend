import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/admin/')({
  component: AdminIndexComponent,
});

function AdminIndexComponent () {
  return <div>Hello "/admin-panel"!</div>;
}
