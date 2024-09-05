import {Component, HostListener, OnInit} from '@angular/core';
import {PlayerDto} from "../dto/player.dto";
import {PlayerService} from "../services/player.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopBarComponent} from "../top-bar/top-bar.component";
import {NgIf} from "@angular/common";
import {LeaderboardSortingPropertyModel} from "../models/leaderboard-sorting-property.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NewPlayerDialogComponent} from "../matchmaking/new-player-dialog/new-player-dialog.component";
import {EditionDialogComponent} from "./edition-dialog/edition-dialog.component";
import {DeletionDialogComponent} from "./deletion-dialog/deletion-dialog.component";

@Component({
  selector: 'app-player-profile',
  standalone: true,
  imports: [
    TopBarComponent,
    NgIf
  ],
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss'
})
export class PlayerProfileComponent implements OnInit {

  playerId: string = '';
  player!: PlayerDto;
  dialogOpen: boolean = false;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  async ngOnInit() {
    await this.route.params.subscribe(params => {
      this.playerId = params['playerId'];
    });
    (await this.playerService.getPlayer(this.playerId, 'unsafe')).subscribe(response => {
      if (response === 'error') {
        this.router.navigate(['/']);
      }
      this.player = response as PlayerDto;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    switch (event.key.toUpperCase()) {
      case 'N':
        if (this.dialogOpen) return;
        const editDialogRef: MatDialogRef<EditionDialogComponent> = this.dialog.open(EditionDialogComponent, {
          width: '250px',
          data: { title: 'Update Player', name: this.player.name }
        });

        this.dialogOpen = true;

        editDialogRef.afterClosed().subscribe(async result => {
          this.dialogOpen = false;
          if (!result) return;
          (await this.playerService.editPlayer(result.badgeId, result.name)).subscribe(response => {
            this.player = response as PlayerDto;
          });
        });
        event.preventDefault();
        break;
      case 'D':
        if (this.dialogOpen) return;
        const deleteDialogRef: MatDialogRef<DeletionDialogComponent> = this.dialog.open(DeletionDialogComponent, {
          width: '50%',
          data: { title: 'Delete Player 😔', name: this.player.name }
        });

        this.dialogOpen = true;

        deleteDialogRef.afterClosed().subscribe(async result => {
          this.dialogOpen = false;
          if (!result) return;
          (await this.playerService.deletePlayer(result.badgeId)).subscribe(response => {
            this.router.navigate(['/']);
          });
        });
        event.preventDefault();
        break;
    }
  }

  getDisplayElo(elo: number): string {
    return elo.toFixed(0);
  }

  getDisplayWlr(wlr: number): string {
    let newWlr = wlr % 1 === 0 ? wlr.toString() : wlr.toFixed(2);
    if (newWlr.length > 1 && newWlr.endsWith('0')) {
      newWlr = newWlr.slice(0, newWlr.length - 1);
    }
    return newWlr
  }

}
