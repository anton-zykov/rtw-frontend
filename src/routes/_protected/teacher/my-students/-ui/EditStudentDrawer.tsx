import { Box, Drawer } from '@mantine/core';
import type { TeachersStudent } from '@/entities/teacher';
import { DrawerContent } from './DrawerContent';

interface EditStudentDrawerProps {
  student: TeachersStudent | null;
  opened: boolean;
  onClose: () => void;
}

export function EditStudentDrawer ({ student, opened, onClose }: EditStudentDrawerProps) {
  return (
    <Drawer opened={opened} onClose={onClose} title="Управление учеником">
      {student
        ? <DrawerContent key={student.id} student={student} />
        : <Box />}
    </Drawer>
  );
}
