import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/teacher')({
  component: TeacherComponent
});

function TeacherComponent () {
  return (
    <Outlet />
  );
}
