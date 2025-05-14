import { User } from "./user";

export interface Conge {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  version: number;
  id: string;
  congeType: string;
  start: string;
  end: string;
  user: User;
  isAccepted: boolean;
}
