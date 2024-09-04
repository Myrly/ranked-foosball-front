import {Component, HostListener} from '@angular/core';
import {PlayerDto} from "../dto/player.dto";
import {TeamCardComponent} from "./team-card/team-card.component";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-matchmaking',
  standalone: true,
  imports: [
    TeamCardComponent,
    TopBarComponent,
    MatDivider
  ],
  templateUrl: './matchmaking.component.html',
  styleUrl: './matchmaking.component.scss'
})
export class MatchmakingComponent {

  team1: (PlayerDto | 'current' | 'queued')[] = [
    new PlayerDto('testid1', 'Jake Peralta', 1000, 0, 0, 0),
    'current',
  ];
  team2: (PlayerDto | 'current' | 'queued')[] = [
    'queued',
    'queued',
  ];

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    console.log('A key was pressed');
    // Add a random PlayerDto to the list of players
  }

}
