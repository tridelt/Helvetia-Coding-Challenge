import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardHeader} from '@angular/material/card';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {Server} from '../../shared/models/server';
import {MatIcon} from '@angular/material/icon';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {InlineEditFieldComponent} from '../../shared/components/inline-edit-field/inline-edit-field.component';

@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css'],
  imports: [
    MatCardHeader,
    MatCard,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggle,
    MatIcon,
    InlineEditFieldComponent
  ],
  standalone: true
})


export class ServerCardComponent implements OnInit {

  @Input() server!: Server
  @Output() persistChanges = new EventEmitter<Server>();
  @Output() labelControlElement = new EventEmitter<AbstractControl>();

  serverCardForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.serverCardForm = this.fb.group({
      label: this.server.label,
      active: this.server.active
    });

    // subscribe to changes of labelControlElement so that the Parent which holds the logic knows when the label changes
    const firstNameControl = this.serverCardForm.get('label');
    firstNameControl!.valueChanges.subscribe(() => {
      this.labelControlElement.emit(firstNameControl!)
    });
  }

  // Controller functions called from the template when user wants to save
  // creates Patrial<Server> of what shall be saved and calls saveServerChanges
  onSaveLabelEdit() {
    const newLabel = this.serverCardForm.value.label;
    this.saveServerChanges({label: newLabel});
  }

  // Controller functions called from the template when user toggles server's power switch
  // creates Patrial<Server> of what shall be saved and calls saveServerChanges
  onTogglePowerSwitch() {
    const newActive = this.serverCardForm.value.active;
    this.saveServerChanges({active: newActive});
  }

  // Updates the server object with the provided changes and notifies the parent component
  private saveServerChanges(changes: Partial<Server>) {
    this.server = {...this.server, ...changes};
    this.persistChanges.emit(this.server);
  }


}

