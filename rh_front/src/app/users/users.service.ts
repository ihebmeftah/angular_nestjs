import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: { id: number, name: string, email: string, role: string[] }[] = [
    { id: 1, name: 'John Doe', email: 'Bv5hP@example.com', role: ['Admin'] },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@rh.com', role: ['Employer'] },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@rh.com', role: ['Rh'] },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@rh.com', role: ["Rh", "Employer"] },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@rh.com', role: ["Admin", "Employer"] },
    { id: 6, name: 'Eve White', email: 'eve.white@rh.com', role: ["Admin", "Rh"] },
  ]
  constructor() { }
  getUsers(): { id: number, name: string, email: string, role: string[] }[] {
    return this.users;
  }

  getUser(id: number): { id: number, name: string, email: string, role: string[] } | undefined {
    return this.users.find(user => user.id === Number(id));
  }
}
