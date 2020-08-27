import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title: string;
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const todo = {
      title: this.title,
      completed: false,
    };

    this.todoService.addTodo(todo).subscribe((response) => {
      if (response.status === 201) {
        console.log(response);
        this.addTodo.emit(response.body);
        this.title = '';
      }
    });
  }
}
