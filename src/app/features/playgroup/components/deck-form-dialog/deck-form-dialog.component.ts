import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { delay, map, mergeMap, Observable } from 'rxjs';
import { ScryfallService } from 'src/app/core/services/scryfall.service';
import { CardExistsValidator } from 'src/app/shared/validators/card-exists.validator';

@Component({
  selector: 'app-deck-form-dialog',
  templateUrl: './deck-form-dialog.component.html',
  styleUrls: ['./deck-form-dialog.component.css']
})
export class DeckFormDialogComponent implements OnInit {
  autocompletedCommanderOptions: Observable<any[]> | undefined;
  autocompletedPartnerOptions: Observable<string[]> | undefined;

  partnerValidator = this.cardExistsValidator.checkCardName.bind(this.cardExistsValidator);

  public deckForm = this.fb.group({
    name: [null, Validators.required],
    commander: ['', Validators.required, this.cardExistsValidator.checkCardName.bind(this.cardExistsValidator)],
    partner: null,
  });

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private scryfallService: ScryfallService,
    private cardExistsValidator: CardExistsValidator,
  ) { }

  getCommanderFormControl(): FormControl {
    return this.deckForm.get('commander') as FormControl;
  }

  getPartnerFormControl(): FormControl {
    return this.deckForm.get('partner') as FormControl;
  }

  ngOnInit(): void {
    this.autocompletedCommanderOptions = this.getCommanderFormControl().valueChanges.pipe(
      delay(200),
      mergeMap(
        value => this.scryfallService.getCardsAutocomplete(value).pipe(
          map(result => result.data)
        )
      )
    );

    this.autocompletedPartnerOptions = this.getPartnerFormControl().valueChanges.pipe(
      delay(200),
      mergeMap(
        value => this.scryfallService.getCardsAutocomplete(value).pipe(
          map(result => result.data)
        )
      )
    );
    
    this.getPartnerFormControl().valueChanges.subscribe(value => {
        this.addOrRemovePartnerValidation(value);
    });
  }

  private addOrRemovePartnerValidation(value: string) {
    if (value.length > 0 && !this.getPartnerFormControl().hasAsyncValidator(this.partnerValidator)) {
      this.getPartnerFormControl().addAsyncValidators([this.partnerValidator]);
    } else if (value.length == 0 && this.getPartnerFormControl().hasAsyncValidator(this.partnerValidator)){
      this.getPartnerFormControl().removeAsyncValidators([this.partnerValidator]);
      this.getPartnerFormControl().updateValueAndValidity();
    } 
  }
}

