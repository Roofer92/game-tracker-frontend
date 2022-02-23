import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { catchError, delay, map, Observable, of } from "rxjs";
import { ScryfallService } from "src/app/core/services/scryfall.service";

@Injectable()
export class CardExistsValidator {
    constructor(private scryfallService: ScryfallService) {}

    checkCardName(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.scryfallService.getCardByName(control.value).pipe(
            delay(50),
            map(result => result == undefined ? {exists: false} : null),
            catchError(() => of({exists: false})),
        )
    }
}