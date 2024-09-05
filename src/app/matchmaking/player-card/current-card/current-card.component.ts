import { Component } from '@angular/core';
import {PlayerCardComponent} from "../player-card.component";
import {PlayerDto} from "../../../dto/player.dto";

@Component({
  selector: 'app-current-card',
  standalone: true,
  imports: [
    PlayerCardComponent
  ],
  templateUrl: './current-card.component.html',
  styleUrl: './current-card.component.scss'
})
export class CurrentCardComponent {
  currentPlayer: PlayerDto = new PlayerDto('current', 'Waiting...', -1, 0, 0, 0);
}
