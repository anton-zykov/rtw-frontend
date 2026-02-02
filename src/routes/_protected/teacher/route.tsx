import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/teacher')({
  component: TeacherComponent,
  beforeLoad: ({ context }) => {
    if (context.user.details?.role !== 'teacher') {
      redirect({ to: '/', throw: true });
    }
  },
});

function TeacherComponent () {
  return (
    <>
      <div className="p-2">/teacher</div>
      <Outlet />
    </>
  );
}
