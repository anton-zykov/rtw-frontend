import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/admin/')({
  component: AdminIndexComponent,
});

function AdminIndexComponent () {
  return <div>Hello "/admin-panel"!</div>;
}
