import { login as loginApi } from '../api/login';
import { me as meApi } from '../api/me';

export interface User {
  id: string;
  role: string;
}

export class UserStore {
  private _user: User | null = null;

  get user () {
    return this._user;
  }

  async refresh (): Promise<ReturnType<typeof meApi>> {
    const res = await meApi();
    if (res.ok) this._user = res.data;
    else this._user = null;
    return res;
  }

  async login ({ login, password }: { login: string, password: string }): Promise<ReturnType<typeof loginApi>> {
    return await loginApi({ login, password });
  }
}
