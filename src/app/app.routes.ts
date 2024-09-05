import { Routes } from '@angular/router';
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {MatchmakingComponent} from "./matchmaking/matchmaking.component";
import {matchmakingTypeGuard} from "./guards/matchmaking-type.guard";
import {HomeComponent} from "./home/home.component";
import {GameComponent} from "./game/game.component";
import {PlayerProfileComponent} from "./player-profile/player-profile.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'matchmaking/:type', component: MatchmakingComponent, canActivate: [matchmakingTypeGuard] },
  { path: 'game/:gameId', component: GameComponent },
  { path: 'profile/:playerId', component: PlayerProfileComponent },
  { path: '**', redirectTo: '/' }
];
