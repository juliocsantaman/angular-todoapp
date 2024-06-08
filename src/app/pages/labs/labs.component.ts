import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
  title = 'todoapp';
  tasks = ['Install angular', 'Create components', 'Run app'];
  name: string = "Julio Cesar";

  showAlert(text: string): void {
    alert(text);
  }

  changeHandler(event: Event): void {
    console.group('changeHandler');
    console.log('event', event);
    console.groupEnd();
  }

  keydownHandler(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    console.group('keydownHandler');
    console.log('event', event);
    console.log(input.value);
    console.groupEnd();
  }
}
