import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGameDto } from 'src/app/shared/dtos/create-game.dto';
import { Game } from 'src/app/shared/model/game.model';
import { environment } from 'src/environments/environment';

const URL: string = environment.baseURL + "games";

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(URL);
  }

  addGame(createGameDto: CreateGameDto) {
    return this.http.post<Game>(URL, createGameDto);
  }
}
