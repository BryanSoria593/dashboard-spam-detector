import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as MailActions from 'src/app/state/actions/mail.action';
import * as DashboardMailActions from 'src/app/state/actions/dashboard.action';
import { Observable } from 'rxjs';
import { MailInfoModel } from 'src/app/core/models/mail/mail.interface';
import { selectHamToday, selectSpamToday } from 'src/app/state/selectors/dashboard.selector';
import { GenerateExcelTodayService } from 'src/app/modules/services/generate-excel-today.service';
import { take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: []
})
export class HistoryComponent implements OnInit {

  mailsSpam$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>;
  mailsHam$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>;

  constructor(
    private store: Store<AppState>,
    private generateExcelToday: GenerateExcelTodayService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(MailActions.getMailRequest());
    this.store.dispatch(DashboardMailActions.getMailSpamRequest());
    this.store.dispatch(DashboardMailActions.getMailHamRequest());

    this.mailsSpam$ = this.store.select(selectSpamToday);
    this.mailsHam$ = this.store.select(selectHamToday);
  }

  generateExcelSpam() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.mailsSpam$.pipe(
      filter((data) => data && data.length > 0),
      take(1)
    ).subscribe((data) => {
      this.generateExcelToday.addData(data, 'cantidad spam ' + date);
    });
  }

  generateExcelHam() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.mailsHam$.pipe(
      filter((data) => data && data.length > 0),
      take(1)
    ).subscribe((data) => {
      this.generateExcelToday.addData(data, 'cantidad ham ' + date);
    });
  }
}
