import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

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
  createRh() {
    if (this.password === this.cpassword) {
      this.userS.createRh({
        firstName: this.firstName!,
        lastName: this.lastName!,
        email: this.email!,
        password: this.password!
      }).subscribe({
        next: (res: any) => {
          this.router.navigate(['/users']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      console.error("Passwords do not match");
    }
  }
}
