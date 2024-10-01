import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = "direccion Post";
  private tokenKey = "AuthToken";
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { user, password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token); // Guarda el token en el localStorage
          console.log(response.token);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAutenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
