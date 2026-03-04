import { useRouter } from '@tanstack/react-router';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import { updateStudent, updateTaskTypes } from '@/entities/teacher';
import type { TeachersStudent } from '@/entities/teacher';

export function useEditStudentForm (student: TeachersStudent) {
  const [loading, { open: setLoading, close: setLoaded }] = useDisclosure(false);
  const router = useRouter();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      login: student.login,
      fullName: student.fullName ?? '',
      telegramId: student.telegramId ?? '',
      taskTypes: Array.from(student.taskTypes),
    },
  });

  const handleSave = () => {
    const hasStudentChanges =
      form.isDirty('login') || form.isDirty('fullName') || form.isDirty('telegramId');
    const hasTaskTypeChanges = form.isDirty('taskTypes');

    if (!hasStudentChanges && !hasTaskTypeChanges) return;

    setLoading();

    type OperationKind = 'student' | 'taskTypes';
    const operations: { kind: OperationKind; promise: Promise<{ ok: boolean; message?: string }> }[] = [];

    if (hasStudentChanges) {
      operations.push({
        kind: 'student',
        promise: updateStudent({
          studentId: student.id,
          login: form.values.login,
          fullName: form.values.fullName || undefined,
          telegramId: form.values.telegramId || undefined
        })
      });
    }

    if (hasTaskTypeChanges) {
      operations.push({
        kind: 'taskTypes',
        promise: updateTaskTypes({
          studentId: student.id,
          taskTypes: form.values.taskTypes
        })
      });
    }

    const resetStudentFields = () => {
      form.setFieldValue('login', student.login);
      form.setFieldValue('fullName', student.fullName ?? '');
      form.setFieldValue('telegramId', student.telegramId ?? '');
    };

    const resetTaskTypesField = () => {
      form.setFieldValue('taskTypes', Array.from(student.taskTypes));
    };

    void Promise.all(operations.map((op) => op.promise))
      .then((results) => {
        const studentIdx = operations.findIndex((op) => op.kind === 'student');
        const taskTypesIdx = operations.findIndex((op) => op.kind === 'taskTypes');

        const studentOk = studentIdx === -1 || results[studentIdx]?.ok;
        const taskTypesOk = taskTypesIdx === -1 || results[taskTypesIdx]?.ok;

        if (studentIdx !== -1 && studentOk) {
          notifications.show({
            color: 'teal',
            message: 'Основные данные ученика сохранены',
            icon: <IconCheck size={18} />,
            autoClose: 2000,
          });
        } else if (studentIdx !== -1 && !studentOk) {
          notifications.show({
            color: 'red',
            message: 'Не удалось сохранить основные данные ученика',
            icon: <IconX size={18} />,
            autoClose: 4000,
          });
          resetStudentFields();
        }

        if (taskTypesIdx !== -1 && taskTypesOk) {
          notifications.show({
            color: 'teal',
            message: 'Упражнения обновлены',
            icon: <IconCheck size={18} />,
            autoClose: 2000,
          });
        } else if (taskTypesIdx !== -1 && !taskTypesOk) {
          notifications.show({
            color: 'red',
            message: 'Не удалось сохранить упражнения',
            icon: <IconX size={18} />,
            autoClose: 4000,
          });
          resetTaskTypesField();
        }

        if (studentOk && taskTypesOk) {
          void router.invalidate();
        }
      })
      .finally(() => {
        setLoaded();
      })
      .catch((err: unknown) => {
        console.error(err);
        notifications.show({
          color: 'red',
          message: 'Произошла ошибка при сохранении. Попробуйте ещё раз.',
          icon: <IconX size={18} />,
          autoClose: 4000,
        });
        resetStudentFields();
        resetTaskTypesField();
      });
  };

  return { form, loading, handleSave };
}
