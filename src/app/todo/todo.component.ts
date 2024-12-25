import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import des directives Angular de base
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importez ReactiveFormsModule ici
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})

export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  todos: any[] = [];

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      task: [''],
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo() {
    const newTodo = { task: this.todoForm.value.task, completed: false };
    this.todoService.createTodo(newTodo).subscribe(() => {
      this.todoForm.reset();
      this.loadTodos();
    });
  }

  updateTodo(todo: any) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(updatedTodo).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}