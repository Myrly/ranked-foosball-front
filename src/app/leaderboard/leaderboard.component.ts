import { Component } from '@angular/core';
import {TopBarComponent} from "../top-bar/top-bar.component";

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    TopBarComponent
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent {

}
