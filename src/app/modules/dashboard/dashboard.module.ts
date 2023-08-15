import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components

import { AnalyzeComponent } from './pages/analyze/analyze.component';
import { HistoryComponent } from './pages/history/history.component';
import { ReportsComponent } from './pages/reports/reports.component';
// import { MailComponent } from './components/mail/mail.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from './material.module';
import { SpinnerComponent } from 'src/app/core/components/spinner/spinner.component';

// import { DetailsComponent } from './components/mat-dialogs/details/details.component';
// import { ConfirmGenericComponent } from './components/mat-dialogs/confirm-generic/confirm-generic.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CardsComponent } from '../components/cards/cards.component';
import { GraphicBarComponent } from '../components/graphics/graphic-bar/graphic-bar.component';
import { GraphicCircleComponent } from '../components/graphics/graphic-circle/graphic-circle.component';
import { GraphicLineComponent } from '../components/graphics/graphic-line/graphic-line.component';
import { ListComponent } from '../components/list/list.component';
import { GraphicBarComponent2 } from '../components/graphics/graphic-bar2/graphic-bar2.component';
import { GraphicHroizontalBarComponent } from '../components/graphics/graphic-hroizontal-bar/graphic-hroizontal-bar.component';
import { WhiteListComponent } from './pages/lists/white-list/white-list.component';
import { BlackListComponent } from './pages/lists/black-list/black-list.component';
import { ListFilterComponent } from '../components/list-filter/list-filter.component';

import { ConfirmGenericComponent } from '../components/mat-dialogs/confirm-generic/confirm-generic.component';
import { AddOrEditUserComponent } from '../components/mat-dialogs/add-or-edit-user/add-or-edit-user.component';
import { DetailsGenericComponent } from '../components/mat-dialogs/details-generic/details-generic.component';
import { GraphicBarDayComponent } from '../components/graphics/graphic-bar-day/graphic-bar-day.component';
import { GraphicBar2DayComponent } from '../components/graphics/graphic-bar2-day/graphic-bar2-day.component';
import { GraphicBarTotalComponent } from '../components/graphics/graphic-bar-total/graphic-bar-total.component';
import { GraphicBar2TotalComponent } from '../components/graphics/graphic-bar2-total/graphic-bar2-total.component';




@NgModule({
  declarations: [
    AnalyzeComponent,
    HistoryComponent,
    ReportsComponent,
    // DetailsComponent,
    SpinnerComponent,
    ConfirmGenericComponent,
    AddOrEditUserComponent,
    DetailsGenericComponent,
    WhiteListComponent,
    BlackListComponent,
    ListFilterComponent,

    HomeComponent,
    CardsComponent,
    GraphicBarComponent,
    GraphicBarDayComponent,
    GraphicBarTotalComponent,
    GraphicBar2DayComponent,
    GraphicBar2TotalComponent,
    GraphicCircleComponent,
    GraphicLineComponent,
    GraphicBarComponent2,
    GraphicHroizontalBarComponent,
    ListComponent
  ],  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    CoreModule,
    FormsModule,
    MaterialModule,
  ],  
})
export class DashboardModule { }
