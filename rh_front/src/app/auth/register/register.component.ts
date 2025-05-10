import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit(form: any) {
    // Check if the form is valid
    if (form.valid) {
      console.log('Register Data:', { name: this.name, email: this.email, password: this.password });
    }
    else {
      console.error('Form is invalid');
    }
  }
}
