import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePlayerDto } from 'src/app/shared/dtos/create-player.dto';
import { Player } from 'src/app/shared/model/player.model';
import { environment } from 'src/environments/environment';

const URL: string = environment.baseURL + "players";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  addPlayer(createPlayerDto: CreatePlayerDto): Observable<Player> {
    return this.http.post<Player>(URL, createPlayerDto);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(URL);
  }

  getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${URL}/${id}`);
  }

}
