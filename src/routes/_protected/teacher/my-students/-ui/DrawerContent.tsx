import {
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
} from '@mantine/core';
import { mapTaskNames } from '@/entities/student';
import { useEditStudentForm } from '../-model/useEditStudentForm';
import type { TeachersStudent } from '@/entities/teacher';

interface DrawerContentProps {
  student: TeachersStudent;
}

export function DrawerContent ({ student }: DrawerContentProps) {
  const { form, loading, handleSave } = useEditStudentForm(student);

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

      <Stack gap="md">
        <TextInput
          label="Логин"
          key={form.key('login')}
          {...form.getInputProps('login')}
        />

        <TextInput
          label="Полное имя"
          key={form.key('fullName')}
          {...form.getInputProps('fullName')}
        />

        <TextInput
          label="Telegram ID"
          key={form.key('telegramId')}
          disabled
          {...form.getInputProps('telegramId')}
        />

        <Checkbox.Group
          key={form.key('taskTypes')}
          {...form.getInputProps('taskTypes')}
          label="Активные упражнения"
        >
          <Group mt="xs">
            <Checkbox value="adverbs" label={mapTaskNames.adverbs} />
            <Checkbox value="genitive" label={mapTaskNames.genitive} />
            <Checkbox value="stress" label={mapTaskNames.stress} />
            <Checkbox value="tricky" label={mapTaskNames.tricky} disabled />
          </Group>
        </Checkbox.Group>

        <Button onClick={handleSave} mt="sm">
          Сохранить
        </Button>
      </Stack>
    </Box>
  );
}
