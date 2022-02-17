import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-form-dialog',
  templateUrl: './deck-form-dialog.component.html',
  styleUrls: ['./deck-form-dialog.component.css']
})
export class DeckFormDialogComponent implements OnInit {
  public deckForm = this.fb.group({
    name: [null, Validators.required],
    commander: [null, Validators.required],
    commanderScryFallLink: null,
    partner: null,
    partnerScryFallLink: null,
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
