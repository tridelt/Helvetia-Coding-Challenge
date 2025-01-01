import {Component} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-server-modal',
  imports: [
    FormsModule,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatDialogTitle,
    MatInput,
    MatLabel,
    MatCheckbox,
    NgIf,
    MatError
  ],
  templateUrl: './add-server-modal.component.html',
  standalone: true,
  styleUrl: './add-server-modal.component.scss'
})
export class AddServerModalComponent {
  serverName = '';
  serverPath = '';
  serverActive = false;

  constructor(public dialogRef: MatDialogRef<AddServerModalComponent>) {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveServer(): void {
    this.dialogRef.close({
      label: this.serverName,
      path: this.serverPath,
      active: this.serverActive,
    });
  }
}
