import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './container/dashboard/dashboard.component';
import { PlayerDetailsComponent } from './container/player-details/player-details.component';

const routes: Routes = [
    { path: 'playgroup/dashboard', component: DashboardComponent},
    { path: 'playgroup/players/:id', component: PlayerDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroupRoutingModule { }