import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);

  constructor() { }
  getUsers(page: number) {
    return this.http.get(`http://localhost:3000/api/v1/user?page=${page}&limit=5`);
  }

  getUser(id: number){
    return this.http.get(`http://localhost:3000/api/v1/user/${id}`);
  }
}
