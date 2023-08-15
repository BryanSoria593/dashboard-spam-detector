import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, combineLatest } from 'rxjs';
import { MailInfoModel} from 'src/app/core/models/mail/mail.interface';
import { AppState } from 'src/app/state/app.state';
import { GraphicBarService } from '../../../services/graphic-bar.service';

@Component({
  selector: 'app-graphic-bar-total',
  templateUrl: './graphic-bar-total.component.html',
})
export class GraphicBarTotalComponent implements OnInit {

  @ViewChild('myCanvas', { static: true, read: ElementRef }) myCanvas!: ElementRef;
  infoOfGraphicBar: MailInfoModel[] = [];
  @Input() title: string = '';
  @Input() data1: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>();
  @Input() data2: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>();
  @Input() label1: string = '';
  @Input() label2: string = '';
  @Input() color1: string = '';
  @Input() color2: string = '';
  @Input() filter1: string = '';
  @Input() filter2: string = '';
  hasData: boolean = false;

  constructor(
    private store: Store<AppState>,
    private graphicBarService: GraphicBarService
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.combineSubscriptions();
    
  }

  combineSubscriptions(){

    combineLatest([this.data1, this.data2]).subscribe(([hamMails, spamMails]) => {
      if (hamMails.length > 0 && spamMails.length > 0) {
        this.hasData = true;
        this.infoOfGraphicBar = [...hamMails, ...spamMails];
        this.generateBarChart();
      }
    });
  }


  generateBarChart(): void {
    const canvas = this.myCanvas.nativeElement;    
    this.graphicBarService.generateTotalBarChart(canvas, this.title, this.label1, this.label2, this.color1, this.color2, this.infoOfGraphicBar, this.filter1, this.filter2);
  }

}
