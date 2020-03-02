export interface User {
  id: number | string;
  login: string;
  name: string;
  email: string;
  role: Role,
  token: string,
}

export type Role = 'Admin' | 'Doctor';
