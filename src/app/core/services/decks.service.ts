import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDeckDto } from 'src/app/shared/dtos/create-deck.dto';
import { Deck } from 'src/app/shared/model/deck.model';
import { environment } from 'src/environments/environment';

const URL: string = environment.baseURL + "decks";

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) { }

  addDeck(createDeckDto: CreateDeckDto): Observable<Deck> {
    return this.http.post<Deck>(URL, createDeckDto);
  }
}
