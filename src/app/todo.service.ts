import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/todos';

  /* constructor(private http: HttpClient) {} */

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateTodo(todo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
