export interface User {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
  photo: string | null;
  role: string;
  congeNb: number;
}
