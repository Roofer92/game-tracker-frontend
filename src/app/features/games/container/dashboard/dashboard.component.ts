import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GamesService } from 'src/app/core/services/games.service';
import { WinconditionsService } from 'src/app/core/services/winconditions.service';
import { CreateGameDto } from 'src/app/shared/dtos/create-game.dto';
import { CreateWinconditionDto } from 'src/app/shared/dtos/create-wincondition.dto';
import { Deck } from 'src/app/shared/model/deck.model';
import { Game } from 'src/app/shared/model/game.model';
import { Player } from 'src/app/shared/model/player.model';
import { GameFormDialogComponent } from '../../components/game-form-dialog/game-form-dialog.component';
import { WinconFormDialogComponent } from '../../components/wincon-form-dialog/wincon-form-dialog.component';

@Component({
  selector: 'games-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('gamesTable') gamesTable: any

  constructor(
    private dialog: MatDialog,
    private winconditionService: WinconditionsService,
    private gamesService: GamesService,
  ) { }

  ngOnInit(): void {
  }

  public openAddGameDialog(): void {
    const dialogRef = this.dialog.open(GameFormDialogComponent);

    dialogRef.afterClosed().subscribe( result => {
      if (!result) {
        return;
      }

      const participants: {player: Player, deck: Deck, isWinner: boolean}[] = result.participants;

      const createGameDto: CreateGameDto = {
        participants: participants,
        wincondition: result.wincondition,
        playedAt: result.playedAt,
      };

      this.gamesService.addGame(createGameDto).subscribe((game: Game) => {
        this.gamesTable.refresh()
      });
    });
  }

  public openAddWinconDialog(): void {
    const dialogRef = this.dialog.open(WinconFormDialogComponent);

    dialogRef.afterClosed().subscribe( result => {
      if (!result) {
        return;
      }

      const createWinconditionDto: CreateWinconditionDto = result;

      this.winconditionService.addWincondition(createWinconditionDto).subscribe((wincondition) => {
        // TODO: refresh winconditions table
        console.log(wincondition);
      });
    });
  }
}
