import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from '../core/todo.service';
import { Todo } from '../core/todo.interface';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;

  private readonly todoService = inject(TodoService);
  private readonly fb = inject(FormBuilder);

  todoForm = this.fb.group({
    task: [''],
  });

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos$ = this.todoService.getTodos();
  }

  addTodo(): void {
    const newTodo: Todo = { _id: '', title: this.todoForm.value.task, completed: false };
    this.todoService.createTodo(newTodo).subscribe(() => {
      this.todoForm.reset();
      this.loadTodos();
    });
  }

  updateTodo(todo: Todo): void {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}