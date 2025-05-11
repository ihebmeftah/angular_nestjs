import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-user',
  standalone: false,
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent {
  private actRoute = inject(ActivatedRoute);
  user?: { id: number, name: string, email: string, role: string[] };
  usersService = inject(UsersService)

  ngOnInit() {
    console.log('Get user');
    const id = this.actRoute.snapshot.params['id'];
    this.user = this.usersService.getUser(id);
    console.log(this.user);
  }
}
