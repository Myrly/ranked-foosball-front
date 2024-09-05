import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CancelGameDto} from "../dto/cancel-game.dto";
import {AddPlayerGameDto} from "../dto/add-player.dto";
import {catchError, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MatchmakingService {

  constructor(
    private http: HttpClient,
  ) { }

  async createGame() {
    return this.http.post(environment.apiUrl + "/game/", {});
  }

  async cancelGame(gameId: string) {
    return this.http.delete(environment.apiUrl + "/game/" + gameId, {
      body: new CancelGameDto(gameId)
    });
  }

  async addPlayerToGame(gameId: string, playerId: string, isFirstTeam: boolean) {
    return this.http.patch(environment.apiUrl + "/game/" + gameId, new AddPlayerGameDto(gameId, isFirstTeam, playerId)).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.status);
      })
    );
  }

}
