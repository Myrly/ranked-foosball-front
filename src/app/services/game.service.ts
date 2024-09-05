import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FinishGameDto} from "../dto/finish-game.dto";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient,
  ) { }

  getGame(id: string) {
    return this.http.get(environment.apiUrl + "/game/" + id);
  }

  endGame(id: string, firstTeamScore: number, secondTeamScore: number) {
    return this.http.delete(environment.apiUrl + "/game/" + id, {body: new FinishGameDto(id, firstTeamScore, secondTeamScore)});
  }

}
