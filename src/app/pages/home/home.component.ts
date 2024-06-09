import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>
  (
    [
      {
        id: Date.now(),
        title: 'Install angular',
        completed: false
      },
      {
        id: Date.now(),
        title: 'Create components',
        completed: false
      },
      {
        id: Date.now(),
        title: 'Run app',
        completed: false
      }
    ]
  );

  changeHandler(event: Event): void {
    
    const input = event.target as HTMLInputElement;

    if(input.value !== '') {
      this.addTask(input.value);
      input.value = '';
    }


  }

  addTask(title: string): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };

    this.tasks.update((tasks) => [...tasks, newTask]);

  }

  deleteTask(index: number): void {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

}
