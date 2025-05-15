import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../users.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  imports: [UpperCasePipe, DatePipe],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  private actRoute = inject(ActivatedRoute);
  private router = inject(Router);
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

  deleteUser() {
    this.usersService.deleteUser(this.user!.id).subscribe({
      next: (resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'User deleted successfully',
          text: 'User has been deleted successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/users']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
