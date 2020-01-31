export interface User {
  id: number | string;
  login: string;
  name: string;
  email: string;
  // TODO: remove after BE
  password: string;
}
