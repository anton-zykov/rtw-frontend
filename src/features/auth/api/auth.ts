const api = 'https://127.0.0.1:3000/api';

interface authParams {
  login: string;
  password: string;
}

export async function performLogin ({ login, password }: authParams) {
  return await fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ login, password }),
  });
}