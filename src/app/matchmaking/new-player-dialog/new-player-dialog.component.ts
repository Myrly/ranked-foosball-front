import {Component, Inject, ViewChild, ElementRef, AfterViewInit, HostListener} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {nameValidator} from "../../validators/name-validator";

@Component({
  selector: 'app-new-player-dialog',
  templateUrl: './new-player-dialog.component.html',
  imports: [
    FormsModule,
    NgIf,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  standalone: true,
  styleUrls: ['./new-player-dialog.component.scss']
})
export class NewPlayerDialogComponent implements AfterViewInit {
  nameController: FormControl<string | null> = new FormControl<string | null>('', [Validators.required, nameValidator()]);

  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<NewPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.dialogRef.close();
        break;
      case 'Enter':
      case 'Tab':
        this.dialogRef.close({ name: this.nameController.value });
    }
  }
}
