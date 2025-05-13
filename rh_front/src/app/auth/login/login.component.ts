import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authS: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  email?: string;
  password?: string;
  onLogin(form: any) {
    if (form.valid) {
      this.authS.login(this.email!, this.password!).subscribe({
        next: (res: any) => {
          localStorage.setItem("token", res["token"]);
          this._router.navigate(['/']);
          Swal.fire({
            title: 'Login Successful',
            text: 'Welcome back!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
        , error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Please check your credentials.',
            icon: 'error',
            confirmButtonText: 'Retry'
          })
        }
      });
    }
  }

}
