import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { concatMap, flatMap, map, mergeMap, Observable, of, startWith, subscribeOn } from 'rxjs';
import { ScryfallService } from 'src/app/core/services/scryfall.service';

@Component({
  selector: 'app-deck-form-dialog',
  templateUrl: './deck-form-dialog.component.html',
  styleUrls: ['./deck-form-dialog.component.css']
})
export class DeckFormDialogComponent implements OnInit {
  filteredCommanderOptions: Observable<any[]> | undefined;
  filteredPartnerOptions: Observable<string[]> | undefined;

  public deckForm = this.fb.group({
    name: [null, Validators.required],
    commander: [null, Validators.required],
    partner: null,
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private scryfallService: ScryfallService,
  ) { }

  getCommander(): FormControl {
    return this.deckForm.get('commander') as FormControl;
  }

  getPartner(): FormControl {
    return this.deckForm.get('partner') as FormControl;
  }

  ngOnInit(): void {
    this.filteredCommanderOptions = this.getCommander().valueChanges.pipe(
      mergeMap(
        result => this.scryfallService.getCardsAutocomplete(result).pipe(
          map(result => result.data)
        )
      )
    );

    this.filteredPartnerOptions = this.getPartner().valueChanges.pipe(
      mergeMap(
        result => this.scryfallService.getCardsAutocomplete(result).pipe(
          map(result => result.data)
        )
      )
    );
  }
}

