export interface UserDetails {
  id: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'teacher' | 'student' | 'not-set';
