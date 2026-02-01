import { createFileRoute, Link } from '@tanstack/react-router';
import { getTaskTypes, mapTaskNames } from '@/entities/student';
import { Button, Stack, Text } from '@mantine/core';

export const Route = createFileRoute('/_protected/learn/select-task')({
  component: SelectTaskComponent,
  loader: async ({ context }) => {
    const res = await getTaskTypes({ id: context.userStore.user!.id });
    if (!res.ok) throw new Error(res.message);
    return {
      taskTypes: res.data.taskTypes,
    };
  },
  pendingComponent: () => <div>Loading tasks...</div>,
  errorComponent: ({ error }) => <div>{error.message}</div>,
});

function SelectTaskComponent () {
  const { taskTypes } = Route.useLoaderData();
  return (
    <div>
      <Stack
        align="stretch"
        justify="flex-start"
        gap="md"
      >
        <Text>Чем сегодня займемся?</Text>
        {Array.from(taskTypes).map((taskType) => (
          <Button key={taskType} component={Link} to={`/learn/${taskType}/`}>{mapTaskNames[taskType]}</Button>
        ))}
      </Stack>
    </div>
  );
}
