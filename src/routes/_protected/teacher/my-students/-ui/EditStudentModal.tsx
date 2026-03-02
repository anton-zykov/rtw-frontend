import { useRouter } from '@tanstack/react-router';
import { Box, Checkbox, Group, LoadingOverlay, Modal } from '@mantine/core';
import { mapTaskNames } from '@/entities/student';
import { updateTaskTypes } from '@/entities/teacher';
import { useDisclosure } from '@mantine/hooks';
import type { TeachersStudent } from '@/entities/teacher';
import type { TaskType } from '@/shared/types/TaskType.type';

interface EditStudentModalProps {
  student: TeachersStudent | null;
  opened: boolean;
  onClose: () => void;
}

export function EditStudentModal ({ student, opened, onClose }: EditStudentModalProps) {
  const [visible, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const handleUpdateTaskTypes = (value: string[]) => {
    const newTaskTypes = value as TaskType[];
    open();
    updateTaskTypes({
      studentId: student!.id,
      taskTypes: newTaskTypes,
    }).then((res) => {
      if (res.ok) return router.invalidate();
    }).catch((err: unknown) => {
      console.error(err);
    }).finally(() => {
      close();
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Управление учеником">
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <Checkbox.Group
          defaultValue={Array.from(student!.taskTypes)}
          label="Активные упражнения"
          onChange={handleUpdateTaskTypes}
        >
          <Group mt="xs">
            <Checkbox value="adverbs" label={mapTaskNames.adverbs} />
            <Checkbox value="genitive" label={mapTaskNames.genitive} />
            <Checkbox value="stress" label={mapTaskNames.stress} />
            <Checkbox value="tricky" label={mapTaskNames.tricky} />
          </Group>
        </Checkbox.Group>
      </Box>
    </Modal>
  );
}
