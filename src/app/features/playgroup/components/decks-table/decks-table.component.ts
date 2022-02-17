import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Deck } from 'src/app/shared/model/deck.model';

@Component({
  selector: 'playgroup-decks-table',
  templateUrl: './decks-table.component.html',
  styleUrls: ['./decks-table.component.css']
})
export class DecksTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Deck>;

  tableData: any[] = [];
  dataSource = new MatTableDataSource<Deck>(this.tableData);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'winrate'];

  constructor() {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public refresh(decks: Deck[]): void {
    this.dataSource.data = decks;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
