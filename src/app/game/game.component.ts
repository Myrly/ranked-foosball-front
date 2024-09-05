import {Component, HostListener, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../services/game.service";
import {AddPlayerGameDto} from "../dto/add-player.dto";
import {CreateGameDto} from "../dto/create-game.dto";
import {TeamCardComponent} from "../matchmaking/team-card/team-card.component";
import {MatDivider} from "@angular/material/divider";
import {ScoreComponent} from "./score/score.component";
import {PlayerCardComponent} from "../matchmaking/player-card/player-card.component";
import {MatDialogRef} from "@angular/material/dialog";
import {NewPlayerDialogComponent} from "../matchmaking/new-player-dialog/new-player-dialog.component";
import {PlayerDto} from "../dto/player.dto";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    TeamCardComponent,
    MatDivider,
    ScoreComponent,
    PlayerCardComponent,
    NgForOf
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  private gameId: string = '';
  public firstTeamScore: string = '-1';
  public secondTeamScore: string = '-1';
  possibleScoresKeys: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'W'];
  firstTeam: string[] = [];
  secondTeam: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.gameId = params['gameId'];
    });
    await this.gameService.getGame(this.gameId).subscribe(response => {
      let game: CreateGameDto = response as CreateGameDto;
      this.firstTeam = game.firstTeam;
      this.secondTeam = game.secondTeam;
    });
  }

  readyToComplete(): boolean {
    return this.firstTeamScore !== '-1' && this.secondTeamScore !== '-1' && (this.firstTeamScore == 'W' || this.secondTeamScore == 'W') && this.firstTeamScore !== this.secondTeamScore;
  }

  @HostListener('window:keydown', ['$event'])
  async handleKeyDown(event: KeyboardEvent) {
    let key: string = event.key.toUpperCase();
    switch (key) {
      case ' ':
        if (!this.readyToComplete()) return;
        let firstTeamScore: number = this.firstTeamScore === 'W' ? 10 : parseInt(this.firstTeamScore);
        let secondTeamScore: number = this.secondTeamScore === 'W' ? 10 : parseInt(this.secondTeamScore);
        console.log('Ending game with scores: ' + firstTeamScore + ' - ' + secondTeamScore);
        await this.gameService.endGame(this.gameId, firstTeamScore, secondTeamScore).subscribe(response => {
          console.info('Game ended');
          this.router.navigate(['/']).then(r => console.info('Navigated to home'));
        });
        break;
      case 'C':
        this.firstTeamScore = '-1';
        this.secondTeamScore = '-1';
        break;
      default:
        if (this.possibleScoresKeys.includes(key)) {
          if (this.firstTeamScore === '-1') {
            this.firstTeamScore = key;
            if (key !== 'W') {
              this.secondTeamScore = 'W';
            }
          } else if (this.secondTeamScore === '-1' && key !== 'W') {
            this.secondTeamScore = key;
          }

        }
    }
  }

}
