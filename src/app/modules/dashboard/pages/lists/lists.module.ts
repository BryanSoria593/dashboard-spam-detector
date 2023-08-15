import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsRoutingModule } from './lists-routing.module';
import { ListFilterComponent } from 'src/app/modules/components/list-filter/list-filter.component';
import { ReactiveFormsModule } from '@angular/forms';


import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatTooltipModule } from '@angular/material/tooltip';





@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ListsRoutingModule,
    ReactiveFormsModule,
    MatTooltipModule
    
    
  ]
})
export class ListsModule { }
