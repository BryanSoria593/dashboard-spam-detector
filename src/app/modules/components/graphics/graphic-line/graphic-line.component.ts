import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { MailInfoModel, MailReportModel } from 'src/app/core/models/mail/mail.interface';
import { selectMails } from 'src/app/state/selectors/mail.selector';
import { selectHam, selectSpam } from 'src/app/state/selectors/dashboard.selector';
import { GraphicLineService } from 'src/app/modules/services/graphic-line.service';

@Component({
  selector: 'app-graphic-line',
  templateUrl: './graphic-line.component.html',
  styleUrls: []
})
export class GraphicLineComponent implements OnInit {

  @ViewChild('myCanvas', { static: true, read: ElementRef }) myCanvas!: ElementRef;
  
  mails$: Observable<MailReportModel[]> = new Observable<MailReportModel[]>;
  spamAndHamInfo: MailInfoModel[] = [];

  constructor(
    private store: Store<AppState>,
    private GraphicLineService: GraphicLineService
  ) { }

  ngOnInit(): void {

    this.subscribeToHamMails();
    this.subscribeToSpamMails();

  }

  subscribeToHamMails(): void {
    this.store.select(selectHam).subscribe((hamMails) => {
      if (hamMails.length > 0) {
        this.handleMailsUpdate(hamMails);
      }
    });
  }
  
  subscribeToSpamMails(): void {
    this.store.select(selectSpam).subscribe((spamMails) => {
      if (spamMails.length > 0) {
        this.handleMailsUpdate(spamMails);
        // this.lineGraphic(this.spamAndHamInfo);
        this.GraphicLineService.generateLineChart(this.myCanvas.nativeElement, this.spamAndHamInfo);
      }
    });
  }
  handleMailsUpdate(mails: MailInfoModel[]): void {
    this.spamAndHamInfo.push(...mails);
  }
  
}
