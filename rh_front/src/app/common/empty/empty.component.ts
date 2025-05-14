import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty',
  imports: [RouterLink],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.css'
})
export class EmptyComponent {
  @Input() title?: string;
  @Input() description?: string;
  @Input() actionText?: string;
  @Input() actionIcon?: string;
  @Input() actionRoute?: string;
  @Output() action = new EventEmitter<void>();
}
