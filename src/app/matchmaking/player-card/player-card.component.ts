import {Component, Input, OnInit} from '@angular/core';
import {PlayerDto} from "../../dto/player.dto";
import {NgIf} from "@angular/common";
import {PlayerService} from "../../services/player.service";

@Component({
  selector: 'app-player-card',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './player-card.component.html',
  styleUrl: './player-card.component.scss'
})
export class PlayerCardComponent implements OnInit {

  waitingStatuses = [
    {status: '', text: 'Loading...'},
    {status: 'current', text: 'Current...'},
    {status: 'queued', text: 'Queued.'},
  ]

  @Input() playerId: string = '';
  player: PlayerDto = new PlayerDto('loading', 'Loading...', -1, 0, 0, 0, '');

  constructor(
    private playerService: PlayerService
  ) { }

  async ngOnInit(): Promise<void> {
    if (this.playerId === '' || this.playerId === 'current' || this.playerId === 'queued') {
      this.player = new PlayerDto(this.playerId, this.waitingStatuses.find(waitingStatus => waitingStatus.status == this.playerId)?.text ?? '', -1, 0, 0, 0, '');
    } else {
      console.log(this.playerId);
      (await this.playerService.getPlayer(this.playerId, 'unsafe')).subscribe(response => {
        console.log(response);
        this.player = response as PlayerDto;
      });
    }
  }

}
