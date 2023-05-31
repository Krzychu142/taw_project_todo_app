import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../services/resource.service';
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
    private resourceService: ResourceService
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
    this.resourceService.getTodo(id).subscribe(
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
    this.resourceService.updateTodo(this.todo._id, this.todoForm.value).subscribe(
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
