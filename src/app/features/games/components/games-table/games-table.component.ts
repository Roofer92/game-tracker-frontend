import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { GamesService } from 'src/app/core/services/games.service';
import { Game } from 'src/app/shared/model/game.model';

@Component({
  selector: 'games-games-table',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.css']
})
export class GamesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Game>;

  tableData: any[] = [];
  dataSource = new MatTableDataSource<Game>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['playedAt', 'player', 'isWinner', 'wincondition'];

  constructor(
    private gamesService: GamesService,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
      this.gamesService.getAllGames().subscribe((games) => {
        this.dataSource.data = games;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public refresh(): void {
    this.gamesService.getAllGames().subscribe((games) => {
      this.dataSource.data = games;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
