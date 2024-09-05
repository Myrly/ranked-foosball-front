import {Component, Input, OnInit} from '@angular/core';
import {PlayerDto} from "../../dto/player.dto";
import {PlayerCardComponent} from "../player-card/player-card.component";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {CurrentCardComponent} from "../player-card/current-card/current-card.component";
import {QueuedCardComponent} from "../player-card/queued-card/queued-card.component";

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    PlayerCardComponent,
    NgForOf,
    NgStyle,
    NgIf,
    CurrentCardComponent,
    QueuedCardComponent
  ],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss'
})
export class TeamCardComponent implements OnInit {
  @Input() players: (PlayerDto | 'current' | 'queued')[] = [];
  @Input() teamsOf: number = 1;

  ngOnInit() {
    if (this.players.length < this.teamsOf) {

    }
  }

  protected readonly PlayerDto = PlayerDto;
}
