import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PlayersService } from 'src/app/core/services/players.service';
import { Player } from 'src/app/shared/model/player.model';
import { PlayerTableDataSource, } from './player-table-datasource';

@Component({
  selector: 'playgroup-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit, AfterViewInit {
  @Output() selected: EventEmitter<Player> = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Player>;

  tableData: any[] = [];
  dataSource = new MatTableDataSource<Player>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'winrate'];

  constructor(
    private playersService: PlayersService,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
      this.playersService.getPlayers().subscribe((players) => {
        this.dataSource.data = players;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public refresh(): void {
    this.playersService.getPlayers().subscribe((players) => {
      this.dataSource.data = players;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  rowSelected(player: Player) {
    this.selected.emit(player);
  }
}
