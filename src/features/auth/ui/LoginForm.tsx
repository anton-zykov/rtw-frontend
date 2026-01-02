import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { performLogin } from '../api';

export function LoginForm () {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      login: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await performLogin(values);
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