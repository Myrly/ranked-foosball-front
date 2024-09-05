import {Component, Inject, ViewChild, ElementRef, AfterViewInit, HostListener, OnInit} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule, UntypedFormControl, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-edition-dialog',
  templateUrl: './edition-dialog.component.html',
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
  styleUrls: ['./edition-dialog.component.scss']
})
export class EditionDialogComponent implements OnInit, AfterViewInit {
  nameController = new UntypedFormControl('', Validators.required);
  badgeId = '';
  badgeToConfirm = false;

  @ViewChild('nameInput') nameInput!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<EditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.nameController.setValue(this.data.name);
  }

  ngAfterViewInit() {
    this.nameInput.nativeElement.focus();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
    if (this.badgeToConfirm) {
      if (event.key.match(/^[0-9a-fA-F]$/)) {
        this.badgeId += event.key;
      } else if (event.key === 'Enter') {
        this.dialogRef.close({ name: this.nameController.value, badgeId: this.badgeId });
      }
    } else if (event.key === 'Tab') {
      this.nameInput.nativeElement.blur();
      this.badgeToConfirm = true;
      event.preventDefault();
    }
  }
}
