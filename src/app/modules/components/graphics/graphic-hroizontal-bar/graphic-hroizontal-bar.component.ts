import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MailListModel } from 'src/app/core/models/mail/mail.interface';
import { Chart } from 'chart.js';
import { GraphicHorizontalBarService } from 'src/app/modules/services/graphic-horizontal-bar.service';

@Component({
  selector: 'app-graphic-hroizontal-bar',
  templateUrl: './graphic-hroizontal-bar.component.html',
  styleUrls: []
})
export class GraphicHroizontalBarComponent implements OnInit, AfterViewInit {
  @Input() listUsers$: Observable<MailListModel[]> = new Observable<MailListModel[]>;
  @Input() title: string = '';
  @ViewChild('myCanvas', { static: true }) chartCanvas!: ElementRef;
  hasData: boolean = false;


  constructor(
    private graphic: GraphicHorizontalBarService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.listUsers$.subscribe((users) => {
      if (users && users.length > 0) {
        this.hasData = users.length > 0;
        const labels = users.map(user => user.user);
        const data = users.map(user => user.counts);
        this.graphic.renderChart(this.chartCanvas.nativeElement, this.title, labels, data);
      }
    });
  }
}
