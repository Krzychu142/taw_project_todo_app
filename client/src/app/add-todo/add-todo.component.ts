import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from '../services/resource.service';

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
    private resourceService: ResourceService
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
      this.resourceService.createTodo(this.todoForm.value).subscribe(
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
