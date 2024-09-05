import {Component, Input} from '@angular/core';
import {PlayerDto} from "../../dto/player.dto";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent {

  @Input() player!: PlayerDto;

}
