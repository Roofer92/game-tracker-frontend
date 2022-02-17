import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { PlayersService } from 'src/app/core/services/players.service';
import { CreatePlayerDto } from 'src/app/shared/dtos/create-player.dto';
import { Player } from 'src/app/shared/model/player.model';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { PlayerFormDialogComponent } from '../../components/player-form-dialog/player-form-dialog.component';

@Component({
  selector: 'playgroup-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('playersTable') playerTable: any;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private playersService: PlayersService,
  ) { }

  onPlayerSelected(player: Player): void {
      this.router.navigate(['/playgroup/players', player._id]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(PlayerFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      const createPlayerDto = result;
      this.playersService.addPlayer(createPlayerDto).subscribe((player) => {
        this.playerTable.refresh();
      })
    });
  }
}
