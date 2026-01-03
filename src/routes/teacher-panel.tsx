import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/teacher-panel')({
  component: TeacherPanel,
});

function TeacherPanel () {
  return <div>Hello "/teacher-panel"!</div>;
}
