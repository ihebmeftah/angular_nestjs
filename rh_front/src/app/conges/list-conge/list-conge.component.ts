// list-conge.component.ts
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Conge } from '../../models/conge.model';
import { CongesService } from '../conges.service';
import { PaginatedResponse } from '../../models/paginationresponse';
import { LoadingComponent } from "../../common/loading/loading.component";
import { EmptyComponent } from "../../common/empty/empty.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list-conge',
  imports: [NgClass, RouterLink, FormsModule, DatePipe, LoadingComponent, EmptyComponent],
  templateUrl: './list-conge.component.html',
  styleUrls: ['./list-conge.component.css']
})
export class ListCongeComponent {
  congesS: CongesService = inject(CongesService);
  authS: AuthService = inject(AuthService);
  conges?: PaginatedResponse<Conge>;
  page: number = 1;
  nbPages: number[] = [];

  filterType: string = "";

  onOptionChange(value: string) {
    this.filterType = value;
    console.log(this.filterType);
    this.getConges();
  }

  onChangePage(page: number) {
    this.page = page;
    this.getConges()
  }

  nextPage() {
    if (this.page < this.conges!.totalPages) {
      this.page++;
      this.getConges()
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getConges()
    }
  }
  ngOnInit() {
    this.getConges();
  }

  getConges() {
    this.congesS.getConges(this.filterType, this.page).subscribe({
      next: (data: any) => {
        this.conges = data;
        this.nbPages = Array.from({ length: this.conges!.totalPages }, (_, i) => i + 1)

      },
      error: (error) => {
        console.error('Error fetching conges:', error);
      }
    });
  }
}
