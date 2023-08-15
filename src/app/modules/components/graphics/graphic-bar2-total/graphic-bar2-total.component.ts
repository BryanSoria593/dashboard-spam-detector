import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { MailInfoModel, MailReportModel } from 'src/app/core/models/mail/mail.interface';
import { Graphic2BarService } from 'src/app/modules/services/graphic2-bar.service';
import { AppState } from 'src/app/state/app.state';
import { selectAlertMail,  selectReportMail } from 'src/app/state/selectors/dashboard.selector';
@Component({
  selector: 'app-graphic-bar2-total',
  templateUrl: './graphic-bar2-total.component.html',
})
export class GraphicBar2TotalComponent implements OnInit {

  @ViewChild('myCanvas', { static: true, read: ElementRef }) myCanvas!: ElementRef;

  mailsAlert$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>();
  mailsReports$: Observable<MailReportModel[]> = new Observable<MailReportModel[]>();
  hasData: boolean = false;

  constructor(
    private store: Store<AppState>,
    private chartService: Graphic2BarService
    ) {}

  ngOnInit(): void {
    this.subscribeToMails();
    
  }

  subscribeToMails(): void {
    
    this.mailsAlert$ = this.store.select(selectAlertMail);
    this.mailsReports$ = this.store.select(selectReportMail);
    
    this.mailsAlert$.subscribe((alertMails) => {
      this.mailsReports$.subscribe((reportMails) => {
        if (alertMails.length > 0 && reportMails.length > 0) {
          this.hasData = true;
          this.handleMailsUpdate(alertMails, reportMails);

        }
      });
    });
  }

  handleMailsUpdate(alertMails: MailInfoModel[], reportMails: MailReportModel[]): void {
    const canvas = this.myCanvas.nativeElement;
    
    this.chartService.generateTotalBarChart(canvas, 'Cantidad total de alertas enviadas y reportes', alertMails, reportMails);
  }

}
