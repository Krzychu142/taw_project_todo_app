import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'http://localhost:3001/todos'; 

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`);
  }

  getTodo(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos/${id}`);
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/todos`, todo);
  }

  updateTodo(id: string, todo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/todos/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todos/${id}`);
  }
}
