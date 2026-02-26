import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/teacher')({
  component: TeacherComponent
});

function TeacherComponent () {
  return (
    <>
      <div className="p-2">/teacher</div>
      <Outlet />
    </>
  );
}
