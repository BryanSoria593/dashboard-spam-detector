import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MailReportModel } from 'src/app/core/models/mail/mail.interface';
import { AppState } from 'src/app/state/app.state';
import { selectCountAlertTheWeekend, selectCountHamTheWeekend, selectCountReportTheWeekend, selectCountSpamTheWeekend } from 'src/app/state/selectors/dashboard.selector';
import { selectMails } from 'src/app/state/selectors/mail.selector';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  mails$: Observable<MailReportModel[]> = new Observable<MailReportModel[]>;
  cantSpam: number = 0;
  cantHam: number = 0;
  cantAlert: number = 0;
  cantReport: number = 0;  
  constructor(
    private store: Store<AppState>,

  ) { }

  ngOnInit(): void {
    
    this.asignedValues();
  }

  executeFunctions(mails: MailReportModel[]) {
  }

  asignedValues() {
    this.cantHamMails();
    this.cantSpamMails();
    this.cantAlertMails();
    this.canReportMails();

  }

  cantHamMails() {
    this.store.select(selectCountHamTheWeekend).subscribe((resp) => {
      this.cantHam = resp;            
    });
  }
  cantSpamMails() {
    this.store.select(selectCountSpamTheWeekend).subscribe((resp) => {
      this.cantSpam = resp;
    });
  }
  cantAlertMails() {
    this.store.select(selectCountAlertTheWeekend).subscribe((resp) => {      
      this.cantAlert = resp;
    });
  }

  canReportMails() {
    this.store.select(selectCountReportTheWeekend).subscribe((resp) => {      
      this.cantReport = resp;
    });
  }

}
