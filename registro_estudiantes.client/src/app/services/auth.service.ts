import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../..//environments/environment';
import * as  jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = `${environment.apiUrl}/api/Login/login`;
  private tokenKey = "AuthToken";
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const requestBody = { username, password }; 
    return this.httpClient.post<any>(this.LOGIN_URL, requestBody).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          const token = response.token;
          const decoded: any = jwt_decode.jwtDecode(response.token);
          const user = decoded.UserId; 
          localStorage.setItem('user', user.toString());        
        }
      })
    );
  }

  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      console.log(user); 
      return user ? parseInt(JSON.parse(user), 10) || 0 : 0; 
    } else {
      return 0;
    }
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    else {
      return null;
    }
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
    localStorage.removeItem('user');      
    this.router.navigate(['/login']);
  }
}
