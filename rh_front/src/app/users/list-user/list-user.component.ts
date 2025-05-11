import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: { id: number, name: string, email: string, role: string[] }[] = [];
  usersService = inject(UsersService)

  ngOnInit() {
    console.log('Get users');
    this.users = this.usersService.getUsers();
  }
}
