import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, useRouteContext } from '@tanstack/react-router';

export function LoginForm () {
  const navigate = useNavigate();
  const { userStore } = useRouteContext({ from: '__root__' });
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { ok, data, message } = await userStore.login(values);
    if (ok) {
      switch (data.role) {
        case 'admin':
          return navigate({ to: '/admin' });
        case 'teacher':
          return navigate({ to: '/teacher' });
        case 'student':
          return navigate({ to: '/learn/select-task' });
        default:
          form.setFieldError('login', 'Пользователь не активирован');
      }
    } else {
      if (message === 'Invalid credentials') form.setFieldError('password', 'Неверный логин или пароль');
      else if (message === 'User is disabled') form.setFieldError('login', 'Пользователь отключен');
      else form.setFieldError('login', 'Неизвестная ошибка');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Логин"
        key={form.key('login')}
        {...form.getInputProps('login')}
      />

      <PasswordInput
        label="Пароль (если есть)"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
