import { Component } from '@angular/core';

@Component({
  selector: 'app-user-add',
  imports: [],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  cpassword?: string;
  role?: string[];

}
