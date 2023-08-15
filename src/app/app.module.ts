import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';


// NGRX
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Paginator
import { MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER } from '@angular/material/tooltip';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER } from '@angular/material/select';
// Dialog
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { DashboardEffects } from './state/effects/dashboard.effect';
import { authEffects } from './state/effects/auth.effect';
import { MailEffects } from './state/effects/mail.effect';
import { ListFilterEffects } from './state/effects/lists-filter.effects';
import { CookieService } from 'ngx-cookie-service';


import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin
import Chart  from 'chart.js/auto';
import { InjectSessionInterceptor } from './core/interceptors/inject-session.interceptor';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([authEffects, MailEffects, DashboardEffects, ListFilterEffects ]),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectSessionInterceptor,
      multi: true
    },
    MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
    MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    CookieService,
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){
    Chart.register(ChartDataLabels); // Registra el plugin
  }
  
}
