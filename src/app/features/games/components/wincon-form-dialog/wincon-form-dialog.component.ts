import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wincon-form-dialog',
  templateUrl: './wincon-form-dialog.component.html',
  styleUrls: ['./wincon-form-dialog.component.css']
})
export class WinconFormDialogComponent implements OnInit {
  public winconForm = this.fb.group({
    type: ['', Validators.required],
  });

  constructor(    
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
  }

}
