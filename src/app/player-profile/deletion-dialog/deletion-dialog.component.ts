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
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
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
  styleUrls: ['./deletion-dialog.component.scss']
})
export class DeletionDialogComponent implements OnInit {
  name: string = '';
  badgeId = '';

  constructor(
    public dialogRef: MatDialogRef<DeletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.name = this.data.name;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
    if (event.key.match(/^[0-9a-fA-F]$/)) {
      this.badgeId += event.key;
    } else if (event.key === 'Enter') {
      this.dialogRef.close({ badgeId: this.badgeId });
    }
  }
}
