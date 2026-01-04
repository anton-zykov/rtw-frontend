import { login as loginApi } from '../api';

class User {
  id: string | null = null;
  role: string | null = null;

  async login ({ login, password }: { login: string, password: string }): Promise<ReturnType<typeof loginApi>> {
    const res = await loginApi({ login, password });
    if (res.ok) {
      this.id = ''; // data.id;
      this.role = res.data.role;
    }
    return res;
  }

  logout () {
    this.id = null;
    this.role = null;
  }
}

export const user = new User();
