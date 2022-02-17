import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { PlayersService } from 'src/app/core/services/players.service';
import { PlayerTableDataSource, PlayerTableItem } from './player-table-datasource';

@Component({
  selector: 'playgroup-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.css']
})
export class PlayerTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<PlayerTableItem>;

  tableData: any[] = [];
  dataSource = new MatTableDataSource<PlayerTableDataSource>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'id'];

  constructor(
    private playersService: PlayersService,
  ) {
    
  }
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
}
