import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as jspdf from 'jspdf';
import { Observable, combineLatest, take } from 'rxjs';
import { MailInfoModel, MailListModel, MailReportModel } from 'src/app/core/models/mail/mail.interface';
import { Graphic2BarService } from 'src/app/modules/services/graphic2-bar.service';
import { AppState } from 'src/app/state/app.state';
import * as DashboardMailActions from 'src/app/state/actions/dashboard.action';
import { selectAlertMail, selectCountAlertMail, selectCountAlertTheWeekend, selectCountAlertToday, selectCountHam, selectCountHamTheWeekend, selectCountHamToday, selectCountReportMail, selectCountReportTheWeekend, selectCountReportToday, selectCountSpam, selectCountSpamTheWeekend, selectCountSpamToday, selectFromMails, selectHam, selectReportMail, selectSpam, selectToMails } from 'src/app/state/selectors/dashboard.selector';
import html2canvas from 'html2canvas';
import { GeneralService } from 'src/app/modules/services/general.service';
import { GenerateExcelService } from 'src/app/modules/services/generate-excel.service';
import { selectMail, selectUsername } from 'src/app/state/selectors/user.selector';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas') myCanvas: any;

  mails$: Observable<MailReportModel[]> = new Observable<MailReportModel[]>;
  mailsFrom$: Observable<MailListModel[]> = new Observable<MailListModel[]>;
  mailsTo$: Observable<MailListModel[]> = new Observable<MailListModel[]>;
  mailHam$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>;
  mailSpam$: Observable<MailInfoModel[]> = new Observable<MailInfoModel[]>;

  username: string = '';
  email: string = '';

  countFrom: number = 0;
  countTo: number = 0;

  countTotalHam: number = 0;
  countTotalSpam: number = 0;
  countTotalAlert: number = 0;
  countTotalReport: number = 0;
  showOverlay = false; // Variable para controlar la visibilidad del div de cobertura

  // Contar la ultima semana

  countHamTheWeekend: number = 0;
  countSpamTheWeekend: number = 0;
  countAlertTheWeekend: number = 0;
  countReportTheWeekend: number = 0;


  // Contar el dia de hoy 
  dataFetched: boolean = false; // Bandera para verificar si los datos ya se obtuvieron

  countHamToday: number = 0;
  countSpamToday: number = 0;
  countAlertToday: number = 0;
  countReportToday: number = 0;


  constructor(
    private p: Graphic2BarService,
    private store: Store<AppState>,
    private generalService: GeneralService,
    private excelService: GenerateExcelService
  ) { }

  ngOnInit() {
    this.fetchDashboardMailData();
    this.store.select(selectUsername).subscribe((username) => {
      this.username = username;
    });
    this.store.select(selectMail).subscribe((email) => {
      this.email = email;
    });

  }

  ngAfterViewInit() { }

  fetchDashboardMailData(): void {

    this.store.dispatch(DashboardMailActions.getMailReportRequest());
    this.store.dispatch(DashboardMailActions.getMailFromRequest());
    this.store.dispatch(DashboardMailActions.getMailHamRequest());
    this.store.dispatch(DashboardMailActions.getMailSpamRequest());
    this.store.dispatch(DashboardMailActions.getMailAlertRequest());

    combineLatest([
      this.store.select(selectCountHam),
      this.store.select(selectCountSpam),
      this.store.select(selectCountAlertMail),
      this.store.select(selectCountReportMail)
    ]).subscribe(([ham, spam, alert, report]) => {
      this.countTotalHam = ham;
      this.countTotalSpam = spam;
      this.countTotalAlert = alert;
      this.countTotalReport = report;
    });

    combineLatest([
      this.store.select(selectCountHamTheWeekend),
      this.store.select(selectCountSpamTheWeekend),
      this.store.select(selectCountAlertTheWeekend),
      this.store.select(selectCountReportTheWeekend)
    ]).subscribe(([countHam, countSpam, countAlert, countReport]) => {
      this.countHamTheWeekend = countHam;
      this.countSpamTheWeekend = countSpam;
      this.countAlertTheWeekend = countAlert;
      this.countReportTheWeekend = countReport;
    })


    combineLatest([
      this.store.select(selectCountHamToday),
      this.store.select(selectCountSpamToday),
      this.store.select(selectCountAlertToday),
      this.store.select(selectCountReportToday)
    ]).subscribe(([countHam, countSpam, countAlert, countReport]) => {
      this.countHamToday = countHam;
      this.countSpamToday = countSpam;
      this.countAlertToday = countAlert;
      this.countReportToday = countReport;
    });


    combineLatest([
      this.store.select(selectCountHamTheWeekend),
      this.store.select(selectCountSpamTheWeekend),
      this.store.select(selectCountAlertTheWeekend),
      this.store.select(selectCountReportTheWeekend)
    ]).subscribe(([countHam, countSpam, countAlert, countReport]) => {
      this.countHamTheWeekend = countHam;
      this.countSpamTheWeekend = countSpam;
      this.countAlertTheWeekend = countAlert;
      this.countReportTheWeekend = countReport;
    });

    // select of today

    combineLatest([
      this.store.select(selectCountHamToday),
      this.store.select(selectCountSpamToday),
      this.store.select(selectCountAlertToday),
      this.store.select(selectCountReportToday)
    ]).subscribe(([countHam, countSpam, countAlert, countReport]) => {
      this.countHamToday = countHam;
      this.countSpamToday = countSpam;
      this.countAlertToday = countAlert;
      this.countReportToday = countReport;
    });


    this.mailsFrom$ = this.store.select(selectFromMails);

    this.mailsTo$ = this.store.select(selectToMails);

    this.mails$ = this.store.select(selectReportMail);

    this.mailsFrom$.subscribe((data) => {
      this.countFrom = data.length;
    });

    this.mailsTo$.subscribe((data) => {
      this.countTo = data.length;
    });

    this.dataFetched = true;
  }

  groupDataForSpamAndHam(): void {
    this.mailHam$ = this.store.select(selectHam);
    this.mailSpam$ = this.store.select(selectSpam);
  }

  generatePDF() {
    if (!this.dataFetched) {
      this.fetchDashboardMailData();
    }
    this.groupDataForSpamAndHam();
    this.showOverlay = true; // Mostrar el div de cobertura
    const dialogRef = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500', 0, 0);

    setTimeout(() => {
      const graphicElement = document.getElementById('graphic-bar');
      const graphicElementDay = document.getElementById('graphic-bar-day');
      const graphicElementTotal = document.getElementById('graphic-bar-total');
      const graphicElement2 = document.getElementById('graphic-bar2');
      const graphicElement2Day = document.getElementById('graphic-bar2-day');
      const graphicElement2Total = document.getElementById('graphic-bar2-total');
      const graphicElement3 = document.getElementById('graphic-hroizontal-bar-from');
      const graphicElement4 = document.getElementById('graphic-hroizontal-bar-to');
      const graphicElement5 = document.getElementById('graphic-circle');
      const graphicElement6 = document.getElementById('graphic-line');

      if (graphicElement && graphicElementDay && graphicElementTotal && graphicElement2Total && graphicElement2 && graphicElement2Day && graphicElement3 && graphicElement4 && graphicElement5 && graphicElement6) {

        Promise.all([
          html2canvas(graphicElement),
          html2canvas(graphicElementDay),
          html2canvas(graphicElement2),
          html2canvas(graphicElement2Day),
          html2canvas(graphicElementTotal),
          html2canvas(graphicElement2Total),
          html2canvas(graphicElement3),
          html2canvas(graphicElement4),
          html2canvas(graphicElement5),
          html2canvas(graphicElement6),
        ]).then((canvases) => {
          const doc = new jspdf.jsPDF();
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = doc.internal.pageSize.getHeight();
          const imageWidth = pdfWidth * 0.7;
          const imageHeight = 90;

          const x = (pdfWidth - imageWidth) / 2;

          doc.setFontSize(10);
          this.addContent(doc, canvases, imageWidth, imageHeight)

          dialogRef.close();
        });
      } else {
        dialogRef.close();
      }
    }, 3000);
  }

  async addContent(doc: any, canvases: any[], imageWidth: number, imageHeight: number): Promise<void> {
    const today = new Date();    
    const dateToday = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    const weekend = new Date( today.getFullYear(), today.getMonth(), today.getDate() - 6 );
    const dateWeekend = weekend.getDate() + '-' + (weekend.getMonth() + 1) + '-' + weekend.getFullYear();
    
    const pdfWidth = doc.internal.pageSize.getWidth();

    await this.header(doc);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Reporte de Correos spam y ham', pdfWidth / 2, 30, { align: 'center' });

    // Añadir gráfica 1
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Esta gráfica muestra la cantidad de correos clasificados como Ham y Spam en los últimos 7 días, durante el`, 13, 40);
    doc.text(`día ${dateWeekend} hasta el día ${dateToday}.`, 13, 45);
    doc.text(`Durante este período, se identificaron ${this.countHamTheWeekend} correos legítimos y ${this.countSpamTheWeekend} correos no deseados.`, 13, 50);
    

    doc.addImage(canvases[0].toDataURL('image/webp'), 'WEBP', 30, 55, imageWidth, imageHeight);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Esta gráfica muestra la cantidad de correos clasificados como Ham y Spam detectados durante el día de`, 13, 155);
    doc.text(`hoy ${dateToday}.`, 13, 160);
    doc.text(`En este período, se identificaron un total de ${this.countHamToday} correos legítimos y ${this.countSpamToday} correos no deseados.`, 13, 165);
    
    doc.addImage(canvases[1].toDataURL('image/webp'), 'WEBP', 30, 175, imageWidth, imageHeight);

    doc.addPage();
    await this.header(doc);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Resúmen de correos alertados y reportados', pdfWidth / 2, 30, { align: 'center' });

    // // Añadir gráfica 3
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`La siguiente imagen muestra la cantidad alertas enviadas por el agente, así como la cantidad de correos que`, 13, 40);
    doc.text(`han sido reportados como spam en los últimos 7 días, desde el día ${dateWeekend} hasta el día ${dateToday}.`, 13, 45);
    doc.text(`Durante este período, se registraron un total de ${this.countAlertTheWeekend} alertas y ${this.countReportTheWeekend} reportes relacionados con correos spam`, 13, 50);

    doc.addImage(canvases[2].toDataURL('image/webp'), 'WEBP', 30, 65, 140, 70);

    doc.text(`La siguiente imagen muestra la cantidad alertas enviadas por el agente, así como la cantidad de correos que`, 13, 150);
    doc.text(`han sido reportados como spam durante el día de hoy ${dateToday}.`, 13, 155);
    doc.text(`Durante este período, se registraron un total de ${this.countAlertToday} alertas y ${this.countReportToday} reportes relacionados con correos spam.`, 13, 160);

    doc.addImage(canvases[3].toDataURL('image/webp'), 'WEBP', 30, 180, 140, 70);

    doc.addPage();
    await this.header(doc);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Resúmen total de Correos Ham, Spam, Alertas y alertas reportadas', pdfWidth / 2, 30, { align: 'center' });

    // // Añadir gráfica 3
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(` La siguiente imágen muestra la cantidad total de los correos detectados como ham y spam. Donde el total de`, 13, 40);
    doc.text(`ham es de ${this.countTotalHam} y la cantidad de spam es de ${this.countTotalSpam}.`, 13, 45);



    doc.addImage(canvases[4].toDataURL('image/webp'), 'WEBP', 30, 65, 140, 70);
    doc.text(`La imágen muestra la cantidad total de alertas enviadas por el agente y la cantidad de correos que han sido`, 13, 150);
    doc.text(`reportados como spam. Donde la cantidad de alertas es de ${this.countTotalAlert} y la cantidad de reportes es de ${this.countTotalReport}.`, 13, 155);

    // doc.text(`
    // La imágen muestra la cantidad total de alertas enviadas por el agente y la cantidad de correos que han sido
    // reportados como spam. Donde la cantidad de alertas es de ${this.countTotalAlert} y la cantidad de reportes es de ${this.countTotalReport}.
    // `, 13, 150);
    doc.addImage(canvases[5].toDataURL('image/webp'), 'WEBP', 30, 180, 140, 70);


    doc.addPage();
    await this.header(doc);


    // Añadir gráficas 3 y 4 (segunda página)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Gráficas sobre la relación entre mensajes spam y usuarios', pdfWidth / 2, 30, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(` La gráfica muestra la cantidad de correos spam enviados por diferentes usuarios, estos usuarios han sido`, 13, 40);
    doc.text(`identificados como emisores de correos spam a través de los reportes de los usuarios.`, 13, 45);
    doc.addImage(canvases[6].toDataURL('image/webp'), 'WEBP', 30, 70, imageWidth, imageHeight);

    doc.text(`
      La gráfica muestra la cantidad de correos clasificados como spam receptados por cada usuario.
      `, 13, 160);
    doc.addImage(canvases[7].toDataURL('image/webp'), 'WEBP', 30, 180, imageWidth, imageHeight);

    doc.addPage();
    await this.header(doc);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`
          Gráficas sobre la relación entre correos normales
          y correos detectados como spam`, pdfWidth / 2, 30, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`El gráfico muestra la relación que existe entre la cantidad de correos normales y la cantidad de correos`, 13, 50);
    doc.text(`detectados como spam por el agente.`, 13, 55);

    doc.addImage(canvases[8].toDataURL('image/webp'), 'WEBP', 60, 60, 100, 100);

    doc.text(`El gráfico muestra la relación que existe entre la cantidad de correos normales y la cantidad de correos`, 13, 170);
    doc.text(`detectados como spam por el agente.`, 13, 175);
    doc.addImage(canvases[9].toDataURL('image/webp'), 'WEBP', 40, 200, 140, 70);

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(`Responsable: ${this.username} (${this.email}) - Página ${i} de ${pageCount}`, pdfWidth / 2, doc.internal.pageSize.getHeight() - 20, {
        align: 'center'
      });
    }

    // Guardar el PDF    
    doc.save(`resumen_spam_detector_${dateToday}.pdf`);
  }

  async header(doc: any): Promise<void> {
    const logoPath = '/assets/img/logo.png';
    const img = new Image();

    img.src = logoPath;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = (error) => reject(error);
    });

    doc.addImage(img, 'WEBP', 15, -6, 25, 25);
    doc.setFont('helvetica', 'bold');
    doc.text('Spam detector', 16, 17);
    doc.setFontSize(10);

    doc.setFontSize(12);
    doc.text(new Date().toLocaleString(), 155, 10);
  }


  generateExcel() {
    const dialogRef = this.generalService.openDialogLoading('fa-solid fa-spinner fa-spin', 'text-blue-500', 0, 0);
    if (!this.dataFetched) {
      this.fetchDashboardMailData();
    }

    this.groupDataForSpamAndHam();

    // Obtener los datos de las observables una sola vez
    combineLatest([
      this.mailsFrom$.pipe(take(1)),
      this.mailsTo$.pipe(take(1)),
      this.mails$.pipe(take(1)),
      this.mailHam$.pipe(take(1)),
      this.mailSpam$.pipe(take(1))
    ]).subscribe(([mailsFrom, mailsTo, mails, mailHam, mailSpam]) => {
      // Pasar los datos al servicio excelService
      this.excelService.addData(mailsFrom, mailsTo, mails, mailHam, mailSpam);
    });
    dialogRef.close();

  }



}
