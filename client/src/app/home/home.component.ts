import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  isUserAuthenticated(): boolean {
    return this.authService.userIsAuthenticated;
  }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3001/todos/todos', { headers }).subscribe(
      response => {
        this.todos = response.todos;
      },
      error => {
        console.error(error);
      }
    );
  }
}
