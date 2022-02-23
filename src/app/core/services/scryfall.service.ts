import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL: string = "https://api.scryfall.com";

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {

  constructor(private http: HttpClient) { }

  getCardsAutocomplete(q: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('q', q);

    return this.http.get<any>(`${URL}/cards/autocomplete`, {params});
  }
}
