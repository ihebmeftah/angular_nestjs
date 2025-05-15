import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth/auth.service';

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
  private authS: AuthService = inject(AuthService);
  private router = inject(Router);

  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  cpassword?: string;

  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    photo: null
  };
  avatarPreview: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.photo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    if (this.user.password !== this.user.confirmPassword) return;
    // Only send required fields for createRh
    const userPayload = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    };
    (this.authS.currentUserRole() == "rh" ? this.userS.createEmployer(userPayload) : this.userS.createRh(userPayload)).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Success!',
          text: 'User created successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.router.navigate(['/users']);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          Swal.fire({
            title: 'Error!',
            text: 'Email already used',
            icon: 'error',
            confirmButtonText: 'Retry'
          })
          return;
        }
        if (err.status === 403) {
          Swal.fire({
            title: 'Error!',
            text: 'Rh not authorized to do this action',
            icon: 'error',
            confirmButtonText: 'Retry'
          })
          return;
        }
        console.error(err);
      }
    });
  }


}
