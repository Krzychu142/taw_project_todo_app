import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.mode';
import { AuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';
import { setAuthTokenAndAuthState } from '../pipes/auth.pipe'; // Importujemy nasz pipe

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3001/user';
  private _userIsAuthenticated = false;
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
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
    this.authChange.next(value);
  }

  registerUser(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        setAuthTokenAndAuthState(this), 
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.userIsAuthenticated = true;
        })
      );
  }

  loginUser(user: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, user)
      .pipe(
        setAuthTokenAndAuthState(this),
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.userIsAuthenticated = true;
        })
      );
  }

  logout() {
    this.userIsAuthenticated = false;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
