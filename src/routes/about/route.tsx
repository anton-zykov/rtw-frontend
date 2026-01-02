import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
});

function About () {
  return (
    <>
      <div className="p-2">Hello from Abouttttt!</div>
      <Outlet />
    </>
  );
}
