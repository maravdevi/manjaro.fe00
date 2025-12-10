import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css'
})
export class SwitchComponent {
  @Output() onChange = new EventEmitter<boolean>();
  @Input() activo!: boolean;
  
  toggle(): void {
    this.onChange.emit(this.activo);
  }
}
