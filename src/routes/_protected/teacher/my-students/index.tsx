import { createFileRoute } from '@tanstack/react-router'
import { getMyStudents, type TeachersStudent } from '@/entities/teacher';
import { Stack } from '@mantine/core';

export const Route = createFileRoute('/_protected/teacher/my-students/')({
  component: MyStudentsComponent,
  loader: async ({ context }) => {
    const details = await context.user.getDetails();
    const res = await getMyStudents({ id: details!.id });
    if (!res.ok) throw new Error(res.message);
    return {
      students: res.data as TeachersStudent[],
    };
  },
  pendingComponent: () => <div>Loading students...</div>,
  errorComponent: ({ error }) => <div>{error.message}</div>,
})

function MyStudentsComponent() {
  const { students } = Route.useLoaderData();
  return (
    <div>
      <Stack>
        {students.map((student) => (
          <div key={student.id}>{student.id}</div>
        ))}
      </Stack>
    </div>
  );
}
