import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { CreatePlayerDto } from 'src/app/shared/dtos/create-player.dto';

@Component({
  selector: 'app-player-form-dialog',
  templateUrl: './player-form-dialog.component.html',
  styleUrls: ['./player-form-dialog.component.css']
})
export class PlayerFormDialogComponent implements OnInit {
  public playerForm = this.fb.group({
    name: [null, Validators.required],
  });


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
  }

  public onSubmit() {

  }
}
