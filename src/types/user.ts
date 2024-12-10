export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  role?: string;
  instutionId?: string;
  [key: string]: unknown;
}
