import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  role?: string[];

}
