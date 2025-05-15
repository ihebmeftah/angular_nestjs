import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CongesService } from '../conges.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-conge',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-conge.component.html',
  styleUrl: './add-conge.component.css'
})
export class AddCongeComponent {
  leaveType: string = '';
  startDate: string = '';
  endDate: string = '';
  reason: string = '';
  documents: File[] = [];
  documentNames: string[] = [];
  private congeS = inject(CongesService);
  private router = inject(Router);

  onFileChange(event: any) {
    if (event.target.files) {
      this.documents = Array.from(event.target.files);
      this.documentNames = this.documents.map(f => f.name);
    }
  }

  onSubmit(form: any) {
    if (form.invalid) return;
    const formData = new FormData();
    formData.append('leaveType', this.leaveType);
    formData.append('startDate', this.startDate);
    formData.append('endDate', this.endDate);
    formData.append('reason', this.reason);
    console.log({
      leaveType: this.leaveType,
      startDate: this.startDate,
      endDate: this.endDate,
      reason: this.reason,
      documents: this.documents
    });
    this.documents.forEach(file => formData.append('documents', file));
    this.congeS.requestConge({
      congeType: this.leaveType,
      start: this.startDate,
      end: this.endDate,
      reason: this.reason,
    }).subscribe({
      next: (response) => {
        this.router.navigate(['/conges']);
        Swal.fire({
          icon: 'success',
          title: 'Congé demandé avec succès',
          text: 'Votre demande de congé a été envoyée avec succès.',
          confirmButtonText: 'OK'
        });
      },
      error: (error) => {
        console.error('Error requesting conge:', error);
      }
    });
  }

}
