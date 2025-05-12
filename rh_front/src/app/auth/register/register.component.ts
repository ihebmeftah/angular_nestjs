import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  cpassword: string = '';
  constructor(private _router: Router) { }
  onRegister(form: any) {
    if (form.valid) {
      console.log('Register Data:', {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        cpassword: this.cpassword
      });
      this._router.navigateByUrl('/auth/login');
    }

  }
}
