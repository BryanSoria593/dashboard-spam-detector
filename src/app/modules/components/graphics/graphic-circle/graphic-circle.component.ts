import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { Observable, combineLatest } from 'rxjs';
import { MailReportModel } from 'src/app/core/models/mail/mail.interface';
import { AppState } from 'src/app/state/app.state';
import { selectCountAlertTheWeekend, selectCountHamTheWeekend, selectCountReportTheWeekend, selectCountSpamTheWeekend } from 'src/app/state/selectors/dashboard.selector';

// Importamos el plugin chartjs-plugin-datalabels
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-graphic-circle',
  templateUrl: './graphic-circle.component.html',
  styleUrls: []
})
export class GraphicCircleComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;

  chart: Chart | undefined; // Use 'Chart | undefined' for the chart variable
  hasData: boolean = false;


  mails$: Observable<MailReportModel[]> = new Observable<MailReportModel[]>();
  countHam: number = 0;
  countSpam: number = 0;
  countAlert: number = 0;
  countReport: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  getData() {
    // Combinamos todos los Observables en uno solo
    combineLatest([
      this.store.select(selectCountHamTheWeekend),
      this.store.select(selectCountSpamTheWeekend),
      this.store.select(selectCountAlertTheWeekend),
      this.store.select(selectCountReportTheWeekend)
    ]).subscribe(([cantHam, cantSpam, cantAlert, cantReport]) => {
      // Actualizamos los valores de las cantidades
      this.countHam = cantHam;
      this.countSpam = cantSpam;
      this.countAlert = cantAlert;
      this.countReport = cantReport;

      this.hasData = (cantHam > 0 || cantSpam > 0 || cantAlert > 0 || cantReport > 0);


      // Verificamos si todos los datos son 0 para cambiar hasData a false

      // Creamos el gráfico solo si hay datos
      this.createPieChart();
    });
  }
  createPieChart() {
    const canvas = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    // Limpiamos el canvas antes de crear el nuevo gráfico
    if (this.chart) {
      this.chart.destroy();
    }

    // Check if data is available for all categories before creating the chart
    if (this.countHam > 0 && this.countSpam > 0 && this.countAlert > 0 && this.countReport > 0) {
      const chartData = {
        labels: ['Ham', 'Spam', 'Alertas', 'Reportados'],
        datasets: [{
          data: [this.countHam, this.countSpam, this.countAlert, this.countReport],
          backgroundColor: ['#22c55e', '#ea580c', '#eab308', '#ef4444'],
          borderWidth: 3
        }],
      }

      new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Estadística de los últimos 7 días'
            },
            datalabels: {
              color: '#000',
              font: {
                size: 22,
              },
              formatter: (value, ctx) => {
                // Mostrar el valor dentro de la barra solo si es mayor que 0
                if (Number(value) > 0) {
                  return value;
                } else {
                  return ''; // Si el valor es 0 o menor, no mostrar la etiqueta
                }
              }
            }
          }
        }
      });
    }
  }

}


