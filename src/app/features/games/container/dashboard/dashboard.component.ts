import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameFormDialogComponent } from '../../components/game-form-dialog/game-form-dialog.component';

@Component({
  selector: 'games-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public openAddGameDialog(): void {
    const dialogRef = this.dialog.open(GameFormDialogComponent);

    dialogRef.afterClosed().subscribe( result => {
      if (!result) {
        return;
      }

      console.log(result);
    })
  }

  public openAddWinconDialog(): void {

  }
}
