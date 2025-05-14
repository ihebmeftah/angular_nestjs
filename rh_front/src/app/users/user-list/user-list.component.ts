import { Component, inject } from '@angular/core';
import { PaginatedResponse } from '../../models/paginationresponse';
import { User } from '../../models/user';
import { UsersService } from '../users.service';
import { RouterLink } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { LoadingComponent } from "../../common/loading/loading.component";

@Component({
  selector: 'app-user-list',
  imports: [RouterLink, DatePipe, UpperCasePipe, LoadingComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users?: PaginatedResponse<User>
  usersService = inject(UsersService)
  page: number = 1;
  nbPages: number[] = [];
  onChangePage(page: number) {
    this.page = page;
    this.getUsers()
  }

  nextPage() {
    if (this.page < this.users!.totalPages) {
      this.page++;
      this.getUsers()

    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getUsers()
    }
  }


  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.usersService.getUsers(this.page)
      .subscribe({
        next: (response: any) => {
          this.users = response;
          this.nbPages = Array.from({ length: this.users!.totalPages }, (_, i) => i + 1)
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        }
      });
  }
}
