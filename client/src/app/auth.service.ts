import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.mode'; 
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3001/user';
  private _userIsAuthenticated = false;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this._userIsAuthenticated = true;
    }
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  set userIsAuthenticated(value: boolean) {
    this._userIsAuthenticated = value;
  }

  registerUser(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        tap((response) => {
          console.log(response);

          localStorage.setItem('token', response.token);
          this._userIsAuthenticated = true;
        })
      );
  }

  loginUser(user: {email: string, password: string}): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user)
      .pipe(
        tap((response) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          this._userIsAuthenticated = true;
        })
      );
  }

  logout() {
    this._userIsAuthenticated = false;
    localStorage.removeItem('token');
  }
}