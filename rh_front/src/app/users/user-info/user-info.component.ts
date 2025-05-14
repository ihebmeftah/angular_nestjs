import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../users.service';
import { DatePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
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
