import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { PlaygroupRoutingModule } from './playgroup-routing.module';
import { PlayerTableComponent } from './components/player-table/player-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerDetailsComponent } from './container/player-details/player-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlayerFormDialogComponent } from './components/player-form-dialog/player-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DecksTableComponent } from './components/decks-table/decks-table.component';
import { DeckFormDialogComponent } from './components/deck-form-dialog/deck-form-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PlayerTableComponent,
    PlayerDetailsComponent,
    PlayerFormDialogComponent,
    DecksTableComponent,
    DeckFormDialogComponent
],
  imports: [
    CommonModule,
    PlaygroupRoutingModule,
    SharedModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class PlaygroupModule { }
