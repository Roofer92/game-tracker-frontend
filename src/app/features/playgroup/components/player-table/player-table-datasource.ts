import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface PlayerTableItem {
  _id: number;
  name: string;
  totalGames: number;
  totalWins: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: PlayerTableItem[] = [
  {totalGames: 50, totalWins: 10, _id: 1, name: 'Hydrogen'},
  {totalGames: 50, totalWins: 10, _id: 2, name: 'Helium'},
  {totalGames: 50, totalWins: 10, _id: 3, name: 'Lithium'},
  {totalGames: 50, totalWins: 10, _id: 4, name: 'Beryllium'},
  {totalGames: 50, totalWins: 10, _id: 5, name: 'Boron'},
  {totalGames: 50, totalWins: 10, _id: 6, name: 'Carbon'},
  {totalGames: 50, totalWins: 10, _id: 7, name: 'Nitrogen'},
  {totalGames: 50, totalWins: 10, _id: 8, name: 'Oxygen'},
  {totalGames: 50, totalWins: 10, _id: 9, name: 'Fluorine'},
  {totalGames: 50, totalWins: 10, _id: 10, name: 'Neon'},
  {totalGames: 50, totalWins: 10, _id: 11, name: 'Sodium'},
  {totalGames: 50, totalWins: 10, _id: 12, name: 'Magnesium'},
  {totalGames: 50, totalWins: 10, _id: 13, name: 'Aluminum'},
  {totalGames: 50, totalWins: 10, _id: 14, name: 'Silicon'},
  {totalGames: 50, totalWins: 10, _id: 15, name: 'Phosphorus'},
  {totalGames: 50, totalWins: 10, _id: 16, name: 'Sulfur'},
  {totalGames: 50, totalWins: 10, _id: 17, name: 'Chlorine'},
  {totalGames: 50, totalWins: 10, _id: 18, name: 'Argon'},
  {totalGames: 50, totalWins: 10, _id: 19, name: 'Potassium'},
  {totalGames: 50, totalWins: 10, _id: 20, name: 'Calcium'},
];

/**
 * Data source for the PlayerTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PlayerTableDataSource extends DataSource<PlayerTableItem> {
  data: PlayerTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PlayerTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PlayerTableItem[]): PlayerTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PlayerTableItem[]): PlayerTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a._id, +b._id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
