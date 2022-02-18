import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateWinconditionDto } from 'src/app/shared/dtos/create-wincondition.dto';
import { Wincondition } from 'src/app/shared/model/wincondition.model';
import { environment } from 'src/environments/environment';

const URL: string = environment.baseURL + "winconditions";

@Injectable({
  providedIn: 'root'
})
export class WinconditionsService {

  constructor(private http: HttpClient) { }

  addWincondition(createWinconditionDto: CreateWinconditionDto) {
    return this.http.post<Wincondition>(URL, createWinconditionDto);
  }
}
