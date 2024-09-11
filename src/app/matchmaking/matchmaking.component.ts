import {Component, HostListener, OnInit} from '@angular/core';
import {PlayerDto} from "../dto/player.dto";
import {TeamCardComponent} from "./team-card/team-card.component";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {MatDivider} from "@angular/material/divider";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchmakingService} from "../services/matchmaking.service";
import {NgClass, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {CreateGameDto} from "../dto/create-game.dto";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewPlayerDialogComponent} from "./new-player-dialog/new-player-dialog.component";
import {PlayerService} from "../services/player.service";

@Component({
  selector: 'app-matchmaking',
  standalone: true,
  imports: [
    TeamCardComponent,
    TopBarComponent,
    MatDivider,
    NgClass,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './matchmaking.component.html',
  styleUrl: './matchmaking.component.scss'
})
export class MatchmakingComponent implements OnInit {

  team1: (string | 'current' | 'queued')[] = [];
  team2: (string | 'current' | 'queued')[] = [];

  teamsOf: number = 1;
  readyToStart: boolean = false;
  isLoading: boolean = true;
  gameID: string = '';
  currentPlayerId: string = '';
  dialogOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private matchmakingService: MatchmakingService,
    private playerService: PlayerService,
    private dialog: MatDialog,
    private router: Router,
  ) {
  }

  async onEsc() {
    (await this.matchmakingService.cancelGame(this.gameID)).subscribe(response => {
      console.info('Game cancelled');
      this.router.navigate(['/']).then(r => console.info('Navigated to home'));
    });
  }

  @HostListener('window:keydown', ['$event'])
  async handleKeyDown(event: KeyboardEvent) {
    if (this.dialogOpen) return;
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        if (!this.readyToStart) return;
        let playersToShuffle: (string | 'current' | 'queued')[] = this.team1.concat(this.team2);
        let shuffledPlayers: (string | 'current' | 'queued')[] = playersToShuffle.sort(() => Math.random() - 0.5);
        this.team1 = shuffledPlayers.slice(0, this.teamsOf);
        this.team2 = shuffledPlayers.slice(this.teamsOf, this.teamsOf * 2);
        break;
      case ' ':
        if (!this.readyToStart) return;
        this.router.navigate(['/game/' + this.gameID]).then(r => console.info('Navigated to game'));
        break;
      case 'Enter':
        let allPlayer: (string | 'current' | 'queued')[] = this.team1.concat(this.team2);
        let playerIndex: number = allPlayer.indexOf('current');
        (await this.matchmakingService.addPlayerToGame(this.gameID, this.currentPlayerId, playerIndex <= this.team1.length-1)).subscribe(response => {
          this.currentPlayerId = '';
          if (typeof response === 'number') {
            switch (response) {
              case 404:
                const dialogRef: MatDialogRef<NewPlayerDialogComponent> = this.dialog.open(NewPlayerDialogComponent, {
                  width: '250px',
                  data: { title: 'New Player', name: '' }
                });

                this.dialogOpen = true;

                dialogRef.afterClosed().subscribe(async result => {
                  this.dialogOpen = false;
                  if (!result) return;
                  (await this.playerService.createPlayer(result.badgeId, result.name)).subscribe(response => {
                    this.addPlayer((response as PlayerDto)._id, allPlayer, playerIndex);
                  });
                  (await this.matchmakingService.addPlayerToGame(this.gameID, result.badgeId, playerIndex <= this.team1.length-1)).subscribe(response => {
                    if (response === 200) {
                      this.currentPlayerId = result.badgeId;
                    }
                  });
                });
                break;
            }
            return;
          } else {
            this.addPlayer(response as string, allPlayer, playerIndex);
          }
        });
        break;
      default:
        let allPlayers: (string | 'current' | 'queued')[] = this.team1.concat(this.team2);
        if (event.key.match(/^[0-9a-fA-F]$/) && allPlayers.some(player => player == 'current')) {
          this.currentPlayerId += event.key;
        }
    }
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      params['type'] === 'solo' ? this.teamsOf = 1 : this.teamsOf = 2;
    });
    switch (this.teamsOf) {
      case 1:
        this.team1 = ['current'];
        this.team2 = ['queued'];
        break;
      case 2:
        this.team1 = ['current', 'queued'];
        this.team2 = ['queued', 'queued'];
        break;
    }
    (await this.matchmakingService.createGame()).subscribe(response => {
      this.gameID = (response as CreateGameDto).id;
      this.isLoading = false;
    });
  }

  addPlayer(newPlayer: string, allPlayers: (string | 'current' | 'queued')[], playerIndex: number) {
    allPlayers[playerIndex] = newPlayer;
    let queuedIndex: number = allPlayers.indexOf('queued');
    if (queuedIndex !== -1) {
      allPlayers[queuedIndex] = 'current';
    }
    this.team1 = allPlayers.slice(0, this.teamsOf);
    this.team2 = allPlayers.slice(this.teamsOf, this.teamsOf * 2);
    this.checkReady();
  }

  checkReady() {
    let allPlayers: (string | 'current' | 'queued')[] = this.team1.concat(this.team2);
    this.readyToStart = allPlayers.every(player => player !== 'current' && player !== 'queued');
  }

}
