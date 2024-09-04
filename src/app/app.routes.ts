import { Routes } from '@angular/router';
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {MatchmakingComponent} from "./matchmaking/matchmaking.component";
import {matchmakingTypeGuard} from "./guards/matchmaking-type.guard";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'matchmaking/:type', component: MatchmakingComponent, canActivate: [matchmakingTypeGuard] },
  { path: '**', redirectTo: '/' }
];
