import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CongesService {
  private http = inject(HttpClient);
  constructor() { }

  getConges(type: string, page: number) {
    let link = `http://localhost:3000/api/v1/conges?page=${page}&limit=5`;
    if (type !== "") {
      link += `&type=${type}`;
    }
    return this.http.get(link);
  }

  requestConge(data: {
    congeType: string,
    start: string,
    end: string,
    reason: string
  }) {
    return this.http.post("http://localhost:3000/api/v1/conges/request", data);
  }

  accepteConge(id: string) {
    return this.http.patch(`http://localhost:3000/api/v1/conges/${id}/accepted`, {});
  }
  rejectConge(id: string) {
    return this.http.patch(`http://localhost:3000/api/v1/conges/${id}/rejected`, {});
  }
}
