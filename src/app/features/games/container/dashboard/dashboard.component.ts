import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WinconditionsService } from 'src/app/core/services/winconditions.service';
import { CreateWinconditionDto } from 'src/app/shared/dtos/create-wincondition.dto';
import { GameFormDialogComponent } from '../../components/game-form-dialog/game-form-dialog.component';
import { WinconFormDialogComponent } from '../../components/wincon-form-dialog/wincon-form-dialog.component';

@Component({
  selector: 'games-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private winconditionService: WinconditionsService,
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
