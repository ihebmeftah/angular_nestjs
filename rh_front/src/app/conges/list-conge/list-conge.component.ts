// list-conge.component.ts
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

enum CongeType {
  CONGE_MALADIE = 'conge_maladie',
  CONGE_DE_FORMATION = 'conge_de_formation',
  CONGE_DE_SANTE = 'conge_de_sante',
  CONGE_DE_VACANCES = 'conge_de_vacances',
}

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Conge {
  id: number;
  user: User;
  type: CongeType;
  startDate: string;
  endDate: string;
  duration: number;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-list-conge',
  imports: [NgClass, RouterLink],
  templateUrl: './list-conge.component.html',
  styleUrls: ['./list-conge.component.css']
})
export class ListCongeComponent {
  conges: Conge[] = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: CongeType.CONGE_DE_VACANCES,
      startDate: '2023-06-15',
      endDate: '2023-06-22',
      duration: 7,
      status: 'pending'
    }, {
      id: 1,
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: CongeType.CONGE_DE_VACANCES,
      startDate: '2023-06-15',
      endDate: '2023-06-22',
      duration: 7,
      status: 'pending'
    }, {
      id: 1,
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: CongeType.CONGE_DE_VACANCES,
      startDate: '2023-06-15',
      endDate: '2023-06-22',
      duration: 7,
      status: 'pending'
    }, {
      id: 1,
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: CongeType.CONGE_DE_VACANCES,
      startDate: '2023-06-15',
      endDate: '2023-06-22',
      duration: 7,
      status: 'pending'
    }, {
      id: 1,
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      type: CongeType.CONGE_DE_VACANCES,
      startDate: '2023-06-15',
      endDate: '2023-06-22',
      duration: 7,
      status: 'pending'
    },
    {
      id: 2,
      user: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      type: CongeType.CONGE_MALADIE,
      startDate: '2023-06-10',
      endDate: '2023-06-12',
      duration: 2,
      status: 'approved'
    },
    {
      id: 3,
      user: {
        name: 'Robert Johnson',
        email: 'robert.j@example.com',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
      },
      type: CongeType.CONGE_DE_FORMATION,
      startDate: '2023-07-01',
      endDate: '2023-07-05',
      duration: 4,
      status: 'rejected'
    },
    {
      id: 4,
      user: {
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      type: CongeType.CONGE_DE_SANTE,
      startDate: '2023-06-20',
      endDate: '2023-06-25',
      duration: 5,
      status: 'pending'
    }
  ];

  // These would be connected to actual methods in a real application
  approveConge(id: number) {
    console.log(`Approving leave request ${id}`);
    // In a real app: this.conges.find(c => c.id === id).status = 'approved';
  }

  rejectConge(id: number) {
    console.log(`Rejecting leave request ${id}`);
    // In a real app: this.conges.find(c => c.id === id).status = 'rejected';
  }
}
