import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-info-user',
  standalone: false,
  templateUrl: './info-user.component.html',
  styleUrl: './info-user.component.css'
})
export class InfoUserComponent {
  private actRoute = inject(ActivatedRoute);
  user?: User;
  usersService = inject(UsersService)

  ngOnInit() {
    const id = this.actRoute.snapshot.params['id'];
    this.usersService.getUser(id).subscribe({
      next: (resp: any) => {
        this.user = resp;
      },
      error: (err) => {
      }
    });
  }
}
