import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, pwd: string) {
    return this.http.post(environment.apiURL + '/auth/login', {
      email: email,
      password: pwd,
    });
  }
  getLoggedUser() {
    return this.http.get(environment.apiURL + '/auth/me');
  }
  register(registerdata: {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  }) {
    return this.http.post(environment.apiURL + '/auth/register', registerdata);
  }

  logout() {
    localStorage.removeItem("token")
  }
  isLogged() {
    const token = localStorage.getItem("token");
    if (token)
      return true;
    return false
  }
  currentUserRole() {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const payloadJson = JSON.parse(decodedPayload);
      const role = payloadJson["role"];
      console.log(role);
      return role;
    }
    return null;
  }
}
