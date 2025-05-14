import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  imports: [
    FormsModule
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  private userS: UsersService = inject(UsersService);
  private router = inject(Router);

  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  phone?: string;
  createRh(f: any) {
    if (f.valid) {
      console.log({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        cpassword: this.cpassword,
        phone: this.phone
      })
      this.userS.createRh({
        firstName: this.firstName!,
        lastName: this.lastName!,
        email: this.email!,
        password: this.password!
      }).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Success!',
            text: 'User created successfully.',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this.router.navigate(['/users']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            Swal.fire({
              title: 'Error!',
              text: 'Email already exists.',
              icon: 'error',
              confirmButtonText: 'Retry'
            })
            return
          }
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while creating the user.',
            icon: 'error',
            confirmButtonText: 'Retry'
          })
        }
      });
    } else {
      console.error("Passwords do not match");
    }
  }
}
