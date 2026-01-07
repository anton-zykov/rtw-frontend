export interface User {
  id: string;
  role: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export class UserStore {
  private _user: User | null = null;

  get user () {
    return this._user;
  }

  async refresh () {
    const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
    if (!res.ok) {
      this._user = null;
      return null;
    }

    const user = await res.json() as User;
    this._user = user;
    return user;
  }
}
