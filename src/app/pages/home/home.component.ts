import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal(['Install angular', 'Create components', 'Run app']);

  changeHandler(event: Event): void {
    
    const input = event.target as HTMLInputElement;

    if(input.value !== '') {
      const newTask = input.value;
      this.tasks.update((tasks) => [...tasks, newTask]);
      input.value = '';
    }


  }

  deleteTask(index: number): void {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

}
