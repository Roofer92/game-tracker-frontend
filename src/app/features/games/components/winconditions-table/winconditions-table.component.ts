import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GamesService } from 'src/app/core/services/games.service';
import { WinconditionsService } from 'src/app/core/services/winconditions.service';
import { Wincondition } from 'src/app/shared/model/wincondition.model';

@Component({
  selector: 'games-winconditions-table',
  templateUrl: './winconditions-table.component.html',
  styleUrls: ['./winconditions-table.component.css']
})
export class WinconditionsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Wincondition>;
  
  tableData: any[] = [];
  dataSource = new MatTableDataSource<Wincondition>(this.tableData);
  playedGames = 0;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['type', 'winrate'];

  constructor(
    private winconditionsService: WinconditionsService,
    private gamesService: GamesService,
  ) {}

  ngOnInit(): void {
    this.winconditionsService.getAllWincondtions().subscribe((wincons) => {
      console.log(wincons);
      this.dataSource.data = wincons;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getTotalGames();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public refresh(): void {
    this.winconditionsService.getAllWincondtions().subscribe((wincons) => {
      this.dataSource.data = wincons;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.getTotalGames();
    });
  }

  getTotalGames(): void {
    this.gamesService.getAllGames().subscribe((games) => {
      this.playedGames = games.length;
    })
  }
}
