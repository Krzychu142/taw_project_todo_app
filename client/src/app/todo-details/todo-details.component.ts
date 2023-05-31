import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {
  todo: any;
  todoForm: FormGroup = new FormGroup({});
  updateSuccess: boolean = false;
  updateError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchTodo(id);
    } else {
      console.error('ID is null');
    }
  }

  fetchTodo(id: string): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`http://localhost:3001/todos/todos/${id}`, { headers }).subscribe(
      response => {
        this.todo = response.todo;
        this.todoForm = new FormGroup({
          title: new FormControl(this.todo.title),
          content: new FormControl(this.todo.content),
          completed: new FormControl(this.todo.completed)
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put<any>(`http://localhost:3001/todos/todos/${this.todo._id}`, this.todoForm.value, { headers }).subscribe(
      response => {
        this.updateSuccess = true;
        this.updateError = false;
      },
      error => {
        this.updateError = true;
        this.updateSuccess = false;
        console.error(error);
      }
    );
  }
}
