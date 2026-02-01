import { useCallback, useMemo, useState } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { checkExerciseAnswers, getGenitiveExercise } from '@/entities/student';
import { Button, Grid, Radio, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { OptionCard } from './-ui/OptionCard';
import type { UUID } from '@/shared/types/uuid';
import styles from './index.module.css';

export const Route = createFileRoute('/_protected/learn/genitive/')({
  component: GenitiveIndexComponent,
  loader: async ({ context }) => {
    const res = await getGenitiveExercise({ id: context.userStore.user!.id });
    if (!res.ok) throw new Error(res.message);
    return {
      exercise: res.data.exercise.map(task => ({ ...task, options: task.options.sort(() => Math.random() - 0.5) })),
      userId: context.userStore.user!.id,
    };
  },
  pendingComponent: () => <div>Загружаем упражнение...</div>,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function GenitiveIndexComponent () {
  const router = useRouter();
  const { exercise, userId } = Route.useLoaderData();
  const [formStage, setFormStage] = useState<'solving' | 'checking' | 'check-error' | 'checked'>('solving');
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<UUID, { value: string; correct: boolean }>>({});
  const initialValues = useMemo(
    () => Object.fromEntries(exercise.map((task) => [task.taskId, ''])),
    [exercise]
  );

  const validateValue = (value: string) => (value ? null : 'Выберите ответ');
  const validate = useMemo(
    () => Object.fromEntries(exercise.map((task) => [task.taskId, validateValue])),
    [exercise]
  );

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate,
  });

  const handleSubmit = async (values: Record<string, string>) => {
    setFormStage('checking');
    try {
      const res = await checkExerciseAnswers({
        userId,
        exercise: Object.entries(values).map(([taskId, answer]) => ({ taskId, answer })),
      });
      if (!res.ok) {
        setFormStage('check-error');
        return;
      }
      const answersMap = Object.fromEntries(
        res.data.checkedTasks.map((task) => [
          task.taskId,
          { value: values[task.taskId], correct: task.correct },
        ])
      );
      setSubmittedAnswers(answersMap);
      setFormStage('checked');
    } catch (error) {
      setFormStage('check-error');
    }
  };

  const formKey = useMemo(() => JSON.stringify(exercise), [exercise]);
  const isChecked = formStage === 'checked';

  const getCorrect = useCallback((taskId: string, optionValue: string): boolean | null => {
    if (!isChecked) return null;
    if (!(taskId in submittedAnswers)) return null;
    const answer = submittedAnswers[taskId];
    if (answer.value !== optionValue) return null;
    return answer.correct;
  }, [isChecked, submittedAnswers]);

  const handleNextExercise = () => {
    setFormStage('solving');
    setSubmittedAnswers({});
    form.reset();
    void router.invalidate();
  };

  return (
    <form key={formKey} onSubmit={form.onSubmit(handleSubmit)}>
      {exercise.map((task) => (
        <Radio.Group
          key={`${formKey}-${task.taskId}`}
          {...form.getInputProps(task.taskId)}
        >
          <Grid>
            <Grid.Col span={4}>
              <Text>{task.nominative}</Text>
            </Grid.Col>
            {task.options.map((option) => (
              <Grid.Col key={option.word} span={4}>
                <OptionCard
                  value={option.word}
                  correct={getCorrect(task.taskId, option.word)}
                  disabled={formStage !== 'solving'}
                >
                  <Text>{option.word}</Text>
                </OptionCard>
              </Grid.Col>
            ))}
          </Grid>
        </Radio.Group>
      ))}

      <Button
        type="submit"
        loading={formStage === 'checking'}
        variant="filled"
        disabled={formStage !== 'solving'}
        className={styles.submitButton}
      >
        {formStage === 'solving' && 'Проверить'}
        {formStage === 'check-error' && 'Что-то пошло не так'}
        {formStage === 'checked' && 'Готово!'}
      </Button>

      <Button
        disabled={formStage !== 'checked'}
        onClick={handleNextExercise}
      >
        Следующее упражнение
      </Button>
    </form>
  );
}
