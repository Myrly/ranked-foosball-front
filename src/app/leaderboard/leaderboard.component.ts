import {Component, HostListener, OnInit} from '@angular/core';
import {TopBarComponent} from "../top-bar/top-bar.component";
import {PlayerDto} from "../dto/player.dto";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {LeaderboardSortingPropertyModel} from "../models/leaderboard-sorting-property.model";
import {LeaderboardService} from "../services/leaderboard.service";
import {Router} from "@angular/router";
import {PlayerService} from "../services/player.service";

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    TopBarComponent,
    MatProgressSpinner,
    NgIf,
    NgForOf,
    NgClass,
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {

  constructor(
    private leaderboardService: LeaderboardService,
    private router: Router,
    private playerService: PlayerService,
  ) {
  }

  players: PlayerDto[] = [];
  isLoading: boolean = false;
  currentKey: string = '-elo';
  sortingKeys: LeaderboardSortingPropertyModel[] = [
    {name: 'Name', key: 'N', sorting: 'name', propertyName: 'name'},
    {name: 'Elo', key: 'L', sorting: '-elo', propertyName: 'elo'},
    {name: 'Wins', key: 'W', sorting: '-wins', propertyName: 'wins'},
    {name: 'Games', key: 'G', sorting: '-games', propertyName:'games'},
    {name: 'WLR', key: 'R', sorting: '-wlr', propertyName: 'wlr'},
  ];

  playerId: string = '';

  ngOnInit(): void {
    this.sortPlayers().then(r => console.info('Updated players.'));
  }

  @HostListener('window:keydown', ['$event'])
  async handleKeyDown(event: KeyboardEvent) {
    let currentIndex: number;
    switch (event.key) {
      case 'ArrowRight':
      case 'Tab':
        currentIndex = this.sortingKeys.findIndex(item => item.sorting === this.currentKey);
        const nextIndex: number = (currentIndex + 1) % this.sortingKeys.length;
        this.currentKey = this.sortingKeys[nextIndex].sorting;
        this.sortPlayers().then(r => console.info('Updated players.'));
        event.preventDefault();
        break;
      case 'ArrowLeft':
        currentIndex = this.sortingKeys.findIndex(item => item.sorting === this.currentKey);
        const previousIndex: number = (currentIndex - 1 + this.sortingKeys.length) % this.sortingKeys.length;
        this.currentKey = this.sortingKeys[previousIndex].sorting;
        this.sortPlayers().then(r => console.info('Updated players.'));
        event.preventDefault();
        break;
      case 'Enter':
        (await this.playerService.getPlayer(this.playerId, 'safe')).subscribe(response => {
          this.playerId = '';
          console.log(response);
          if (response != 'error') {
            this.router.navigate(['/profile/' + ((response) as PlayerDto)['_id']]);
          }
        });
        break;
      default:
        event.preventDefault();
        const key: string = event.key.toUpperCase();
        if (event.key.match(/^[0-9a-fA-F]$/)) {
          this.playerId += key;
        } else {
          const index: number = this.sortingKeys.findIndex(item => item.key === key);
          if (index !== -1) {
            this.currentKey = this.sortingKeys[index].sorting;
            this.sortPlayers().then(r => console.info('Updated players.'));
          }
        }
    }
  }

  async sortPlayers() {
    console.log(`Sorting by ${this.currentKey}`);
    this.isLoading = true;
    (await this.leaderboardService.getLeaderboard(this.currentKey)).subscribe(value => {
      this.players = value as PlayerDto[];
      this.isLoading = false;
    });
  }

  getDisplayValue(player: PlayerDto, sortingKey: LeaderboardSortingPropertyModel): string {
    switch (sortingKey.propertyName) {
      case 'elo':
        return player[sortingKey.propertyName].toFixed(0);
      case 'wlr':
        const wlr = player[sortingKey.propertyName];
        let newWlr = wlr % 1 === 0 ? wlr.toString() : wlr.toFixed(2);
        if (newWlr.length > 1 && newWlr.endsWith('0')) {
          newWlr = newWlr.slice(0, newWlr.length - 1);
        }
        return newWlr;
      default:
        return player[sortingKey.propertyName].toString();
    }
  }

}
