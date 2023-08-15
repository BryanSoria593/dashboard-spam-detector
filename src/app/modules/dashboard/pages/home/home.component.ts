import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/modules/auth/service/auth-service.service';

import * as MailActions from 'src/app/state/actions/mail.action';
import * as DashboardMailActions from 'src/app/state/actions/dashboard.action';

import { AppState } from 'src/app/state/app.state';
import { DashboardService } from '../../services/dashboard.service';

import {  selectAlertMail, selectFromMails, selectHam, selectReportMail, selectSpam, selectToMails, } from 'src/app/state/selectors/dashboard.selector';
import { Observable, first } from 'rxjs';
import { MailInfoModel, MailListModel } from 'src/app/core/models/mail/mail.interface';

const today = new Date();
const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000); // Resta 14 días en milisegundos
const month = today.getMonth();
const year = today.getFullYear();

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mailsFrom$: Observable<MailListModel[]> = new Observable<MailListModel[]>;
  mailsTo$: Observable<MailListModel[]> = new Observable<MailListModel[]>;
  
  mailHam$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>;
  mailSpam$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>;

  countListUser$: number = 0;
  

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Verificar si ya hay datos en el store antes de hacer las llamadas
    this.store.select(selectFromMails).pipe(first()).subscribe((data) => {
      if (data.length === 0) {
        // Si no hay datos en el store, hacer las llamadas para obtener los datos
        this.fetchMailData();
        this.fetchDashboardMailData();
        this.fetchReportMailData();
        
      }
    });
  
    // Una vez que se han obtenido los datos (o si ya estaban disponibles en el store),
    // proceder a suscribirse a los observables para obtener los datos necesarios
    this.addFromAndToMails();
    this.groupDataForSpamAndHam();  
  }
  
  
  fetchMailData(): void {
    this.store.dispatch(MailActions.getMailRequest());
  }
  
  fetchDashboardMailData(): void {
    this.store.dispatch(DashboardMailActions.getMailFromRequest());
    this.store.dispatch(DashboardMailActions.getMailHamRequest());
    this.store.dispatch(DashboardMailActions.getMailSpamRequest());
    this.store.dispatch(DashboardMailActions.getMailAlertRequest());
  }
  
  fetchReportMailData(): void {
    this.store.dispatch(DashboardMailActions.getMailReportRequest());
  }

  addFromAndToMails(): void {
    this.mailsFrom$ = this.store.select(selectFromMails);
    this.mailsTo$ = this.store.select(selectToMails);
    this.mailsFrom$.subscribe((data) => {
      this.countListUser$ = data.length;
    });

  }

  groupDataForSpamAndHam(): void {
    this.mailHam$ = this.store.select(selectHam);
    this.mailSpam$ = this.store.select(selectSpam);
  }


}

