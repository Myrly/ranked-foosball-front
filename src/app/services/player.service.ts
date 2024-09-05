import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http: HttpClient,
  ) { }

  async getPlayer(playerId: string, safe: 'safe' | 'unsafe') {
    return this.http.get(environment.apiUrl + "/player/one/" + safe + '/' + playerId).pipe(
      catchError(err => {
        return of('error');
      })
    );
  }

  async createPlayer(playerId: string, playerName: string) {
    return this.http.post(environment.apiUrl + "/player/", {id: playerId, name: playerName});
  }

}
