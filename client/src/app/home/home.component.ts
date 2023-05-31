import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  todos: any[] = [];
  private authSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private authService: AuthService) {}


  isUserAuthenticated(): boolean {
    return this.authService.userIsAuthenticated;
  }

  ngOnInit(): void {
    if (this.isUserAuthenticated()) {
      this.fetchTodos();
    }
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      if (authStatus) {
        this.fetchTodos();
      } else {
        this.todos = [];
      }
    });
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

  deleteTodo(id: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete<any>(`http://localhost:3001/todos/todos/${id}`, { headers }).subscribe(
      response => {
        this.todos = this.todos.filter(todo => todo._id !== id);
      },
      error => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
