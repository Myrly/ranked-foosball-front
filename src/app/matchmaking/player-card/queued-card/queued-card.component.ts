import { Component } from '@angular/core';
import {PlayerCardComponent} from "../player-card.component";
import {PlayerDto} from "../../../dto/player.dto";

@Component({
  selector: 'app-queued-card',
  standalone: true,
  imports: [
    PlayerCardComponent
  ],
  templateUrl: './queued-card.component.html',
  styleUrl: './queued-card.component.scss'
})
export class QueuedCardComponent {
  queuedPlayer: string = 'queued';
}
