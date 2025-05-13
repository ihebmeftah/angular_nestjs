import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authS: AuthService = inject(AuthService);
  private _router: Router = inject(Router);

  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  cpassword: string = '';

  onRegister(form: any) {
    if (form.valid) {
      this.authS.register({
        email: this.email,
        firstName: this.fname,
        lastName: this.lname,
        password: this.password
      }).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: 'Account created Successful',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          this._router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 409) {
            Swal.fire({
              title: 'This email is already registered',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            return;
          }
          Swal.fire({
            title: 'Account creation failed',
            text: 'Please check your credentials.',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      });
    }

  }
}
