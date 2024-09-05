import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(
    private http: HttpClient,
  ) { }

  async getLeaderboard(sorting: string) {
    return this.http.get(environment.apiUrl + "/player/many/" + sorting);
  }

}
