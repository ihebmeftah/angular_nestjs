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
import Swal from 'sweetalert2';

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
  filterStatus: string = "";
  onFilterStatusChange(value: string) {
    this.filterStatus = value;
  }

  onFilterTypeChange(value: string) {
    this.filterType = value;
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

  accepteConge(id: string) {
    this.congesS.accepteConge(id).subscribe({
      next: (data: any) => {
        this.conges?.data.forEach((conge) => {
          if (conge.id === id) {
            conge.isAccepted = true;
          }
        }
        );
        Swal.fire({
          icon: 'success',
          title: 'Congé accepté',
          text: 'Le congé a été accepté avec succès.',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error('Error accepting conge:', error);
      }
    });
  }

  rejectConge(id: string) {
    this.congesS.rejectConge(id).subscribe({
      next: (data: any) => {
        this.conges?.data.forEach((conge) => {
          if (conge.id === id) {
            conge.isAccepted = false;
          }
        }
        );
        Swal.fire({
          icon: 'success',
          title: 'Congé accepté',
          text: 'Le congé a été accepté avec succès.',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: (error) => {
        console.error('Error accepting conge:', error);
      }
    });
  }
}
