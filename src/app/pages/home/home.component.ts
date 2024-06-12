import { Component, computed, effect, signal, OnInit, Injector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  tasks = signal<Task[]>([]);

  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if(filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if(filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  colorControl = new FormControl();
  newTaskControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });
  widthControl = new FormControl(50, {
    nonNullable: true
  });

  isEdit: boolean = false;
  injector = inject(Injector);

  constructor() {

  }

  ngOnInit(): void {
    const storage = localStorage.getItem('tasks');
    if(storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks() {
    effect(() => {
      const tasks = this.tasks();
      console.log('run effect');
      console.log('tasks', tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, { injector: this.injector });
  }

  changeHandler(): void {

    if (this.newTaskControl.valid && this.newTaskControl.value.trim() !== '') {
      this.addTask(this.newTaskControl.value);
      this.newTaskControl.setValue('');
    }


  }

  // changeHandler(event: Event): void {

  //   const input = event.target as HTMLInputElement;

  //   if (input.value.trim() !== '') {
  //     this.addTask(input.value);
  //     input.value = '';
  //   }


  // }

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

  // toggleCompleted(index: number) {
  //   console.group('toggleCompleted');
  //   // console.log('event', event);
  //   const taskToUpdate: Task = this.tasks()[index];

  //   taskToUpdate.completed = !taskToUpdate.completed;

  //   this.tasks()[index] = taskToUpdate;

  //   this.tasks.update(this.tasks);

  //   console.log('tasks', this.tasks());
  //   console.groupEnd();
  // }

  /**
   * No inmutable
   * @param index 
   */
  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (index === position) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    });
  }

  editTask(index: number) {
    // console.group('editTask');
    // console.groupEnd();

    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (index === position) {
          return {
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    });

  }

  saveEditTask(event: any, index: number) {
    console.group('saveEditTask');
    console.log('event', event);
    console.groupEnd();
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (index === position) {
          return {
            ...task,
            title: event.target.value,
            editing: false
          }
        }
        return task;
      })
    });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }

}
