import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todoForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  updateSuccess: boolean = false;
  updateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.todoForm.valid) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
      this.http.post<any>('http://localhost:3001/todos/todos', this.todoForm.value, { headers }).subscribe(
        response => {
          this.updateSuccess = true;
          this.updateError = false;
          this.todoForm.reset();
        },
        error => {
          this.updateSuccess = false;
          this.updateError = true;
        }
      );
    }
  }
}
