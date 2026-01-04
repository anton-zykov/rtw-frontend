import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/learn')({
  component: LearnComponent,
});

function LearnComponent () {
  return (
    <>
      <div className="p-2">/learn</div>
      <Outlet />
    </>
  );
}
