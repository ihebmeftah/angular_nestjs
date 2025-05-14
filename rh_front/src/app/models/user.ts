export class User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  active: boolean;
  photo: string | null;
  role: string;
  congeNb: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: number;

  constructor(data: any) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.active = data.active;
    this.photo = data.photo;
    this.role = data.role;
    this.congeNb = data.congeNb;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
    this.version = data.version;
  }
}