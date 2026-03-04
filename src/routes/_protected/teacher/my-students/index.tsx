import { createFileRoute } from '@tanstack/react-router';
import { getMyStudents, type TeachersStudent } from '@/entities/teacher';
import { Stack, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { EditStudentDrawer } from './-ui/EditStudentDrawer';

export const Route = createFileRoute('/_protected/teacher/my-students/')({
  component: MyStudentsComponent,
  loader: async ({ context }) => {
    const details = await context.user.getDetails();
    const res = await getMyStudents({ id: details!.id });
    if (!res.ok) throw new Error(res.message);
    return {
      students: res.data,
    };
  },
  pendingComponent: () => <div>Loading students...</div>,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function MyStudentsComponent () {
  const { students } = Route.useLoaderData();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const selectedStudent = selectedStudentId
    ? students.find((s) => s.id === selectedStudentId) ?? null
    : null;

  const handleEditStudent = (student: TeachersStudent) => () => {
    setSelectedStudentId(student.id);
    open();
  };

  const handleCloseDrawer = () => {
    close();
    setSelectedStudentId(null);
  };

  return (
    <>
      <Stack>
        {students.map((student) => (
          <UnstyledButton key={student.id} onClick={handleEditStudent(student)}>
            {student.fullName ?? student.login}
          </UnstyledButton>
        ))}
      </Stack>
      <EditStudentDrawer
        student={selectedStudent}
        opened={opened}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
