import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatError, MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatCardTitle} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-inline-edit-field',
  imports: [
    MatFormField,
    MatIcon,
    MatCardTitle,
    MatError,
    NgIf,
    MatInput,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './inline-edit-field.component.html',
  standalone: true,
  styleUrl: './inline-edit-field.component.scss'
})
export class InlineEditFieldComponent {

  @Input() serverCardForm!: FormGroup;
  @Input() serverLabel!: string;
  @Output() saveLabelEdit = new EventEmitter<void>();

  isEditing = false;

  onSaveLabelEdit() {
    if (this.serverCardForm.get('label')?.valid) {
      this.saveLabelEdit.emit()
      this.isEditing = false;
    }
  }

  enterLabelEditMode() {
    this.isEditing = true;
  }

  cancelLabelEditMode() {
    this.serverCardForm.get('label')?.setValue(this.serverLabel);
    this.isEditing = false;
  }


}
