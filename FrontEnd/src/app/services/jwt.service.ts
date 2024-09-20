import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JWTService {
  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }
}
