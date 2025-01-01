import {Component, Input} from '@angular/core';
import {ServerCardComponent} from '../server-card/server-card.component';
import {NgForOf} from '@angular/common';
import {Server} from '../../shared/models/server';
import {ServerService} from '../../services/server';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-server-list',
  imports: [
    ServerCardComponent,
    NgForOf,
  ],
  templateUrl: './server-list.component.html',
  standalone: true,
  styleUrl: './server-list.component.scss'
})
export class ServerListComponent {

  @Input() servers!: Server[];

  constructor(private serverService: ServerService) {
  }

  saveServerChanges(updatedServer: Server) {
    this.serverService.updateServer(updatedServer);
  }

  // Validation for labelControlElement
  // is triggered whenever labelControlElement changes
  onLabelControlElementChange(control: AbstractControl): void {
    const value = control.value?.trim() || '';

    if (!value) {
      control.setErrors({
        customError: true,
        message: 'This field is required.',
      })
    } else if (value.length < 5) {
      control.setErrors({
        customError: true,
        message: 'Must be at least 5 characters long.',
      })
    }
    // additional validation checks... (check if unique or allowed name)

    control.markAsTouched();
  }
}
