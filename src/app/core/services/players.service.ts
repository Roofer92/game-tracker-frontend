import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePlayerDto } from 'src/app/shared/dtos/create-player.dto';
import { environment } from 'src/environments/environment';

const URL: string = environment.baseURL + "players";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  addPlayer(createPlayerDto: CreatePlayerDto): Observable<any> {
    return this.http.post<any>(URL, createPlayerDto);
  }

  getPlayers(): Observable<any> {
    return this.http.get<any>(URL);
  }
}
