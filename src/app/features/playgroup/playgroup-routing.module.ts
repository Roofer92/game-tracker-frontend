import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerFormComponent } from './components/player-form/player-form.component';

import { DashboardComponent } from './container/dashboard/dashboard.component';

const routes: Routes = [
    { path: 'playgroup/dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroupRoutingModule { }