import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/teacher/')({
  component: TeacherIndexComponent,
});

function TeacherIndexComponent () {
  return <div>Hello "/teacher-panel"!</div>;
}
