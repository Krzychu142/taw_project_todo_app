import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  todos: any[] = [];
  private authSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private resourceService: ResourceService
  ) {}

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
    this.resourceService.getTodos().subscribe(
      response => {
        this.todos = response.todos;
        console.log(this.todos);
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteTodo(id: string): void {
    this.resourceService.deleteTodo(id).subscribe(
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
