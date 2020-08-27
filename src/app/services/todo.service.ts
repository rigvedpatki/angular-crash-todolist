import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosUrl: string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit: string = '5';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(this.todosUrl, {
      params: {
        _limit: this.todosLimit,
      },
      observe: 'body',
      responseType: 'json',
    });
  }

  toggleCompleted(todo: Todo): Observable<TodoModificationResponse> {
    return this.http.put<TodoModificationResponse>(
      `${this.todosUrl}/${todo.id}`,
      {
        todo,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'body',
        responseType: 'json',
      }
    );
  }

  deleteTodo(todoId: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.todosUrl}/${todoId}`, {
      observe: 'response',
      responseType: 'json',
    });
  }

  addTodo(todo: {
    title: string;
    completed: boolean;
  }): Observable<HttpResponse<Todo>> {
    return this.http.post<Todo>(
      this.todosUrl,
      {
        ...todo,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        observe: 'response',
        responseType: 'json',
      }
    );
  }
}

interface TodoModificationResponse {
  id: number;
  todo: Todo;
}
