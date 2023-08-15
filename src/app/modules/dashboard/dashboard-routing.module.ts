import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './pages/reports/reports.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent,    

  },
  {
    path:'history',
    component: HistoryComponent 
  },  
  {
    path:'summary',
    component: ReportsComponent
  },
  {
    path:'filter',
    loadChildren: () => import('./pages/lists/lists.module').then(m => m.ListsModule)
  },
  {
    path:'**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
