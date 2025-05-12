import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email?: string;
  password?: string;

  constructor(private _router: Router) { }

  onLogin(form: any) {
    if (form.valid) {
      console.log('Login Data:', {
        email: this.email,
        password: this.password
      });
      this._router.navigateByUrl('/home');
    }
  }

}
