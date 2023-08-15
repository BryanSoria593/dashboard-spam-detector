import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlackListComponent } from './black-list/black-list.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { CoreModule } from 'src/app/core/core.module';


const routes: Routes = [
  {
    path: 'blacklist',
    component: BlackListComponent,
    
  },
  {
    path: 'whitelist',
    component: WhiteListComponent,
  }
  

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],  

})
export class ListsRoutingModule { }
