import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ServerCardComponent} from '../server-card/server-card.component';
import {NgForOf} from '@angular/common';
import {Server} from '../../shared/models/server';
import {ServerService} from '../../services/server';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-server-list',
  imports: [
    ServerCardComponent,
    NgForOf,
    MatSlideToggle,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatFormField,
    MatInput,
  ],
  templateUrl: './server-list.component.html',
  standalone: true,
  styleUrl: './server-list.component.scss'
})
export class ServerListComponent implements OnChanges {

  @Input() servers!: Server[];

  validationEnabled = true;

  filteredServers: Server[] = [];
  statusFilter = 'all';
  labelFilter = ''

  constructor(private serverService: ServerService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reapply filters whenever the servers input changes
    if (changes['servers']) {
      this.onFilterChange();
    }
  }

  saveServerChanges(updatedServer: Server) {
    this.serverService.updateServer(updatedServer);
  }

  onFilterChange(): void {
    this.filteredServers = this.servers.filter(server => {
      const matchesLabel = server.label.toLowerCase().includes(this.labelFilter.toLowerCase());
      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'online' && server.active) ||
        (this.statusFilter === 'offline' && !server.active);
      return matchesLabel && matchesStatus;
    });
  }


  // Validation for labelControlElement
  // is triggered whenever labelControlElement changes
  onLabelControlElementChange(control: AbstractControl): void {
    if (!this.validationEnabled) {
      control.setErrors(null);
      return;
    }


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
