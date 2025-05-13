import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLinkActive, RouterLink, TitleCasePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  authS: AuthService = inject(AuthService);

  user?: {
    id: string,
    email: string,
    role: string,
    fullname: string

  } = {
      id: '',
      email: '',
      role: '',
      fullname: '',
    }
  ngOnInit() {
    this.authS.getLoggedUser().subscribe({
      next: (res) => {
        this.user = res as {
          id: string,
          email: string,
          role: string,
          fullname: string
        };
        console.log(this.user);
      },
      error: (err) => {
        this.authS.logout();
        console.log("GET LOGGED USER ERROR" + err);
      }
    });
  }
}
