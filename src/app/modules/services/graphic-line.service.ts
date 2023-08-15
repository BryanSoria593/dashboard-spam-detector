import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import { MailInfoModel } from 'src/app/core/models/mail/mail.interface';

@Injectable({
  providedIn: 'root'
})
export class GraphicLineService {

  constructor() { }

  generateLineChart(canvas: HTMLCanvasElement, mails: MailInfoModel[]): void {
    const last7Days = this.getLast7Days();
    const dataCount = this.getCountsForLast7Days(mails, last7Days);

    const data = {
      labels: last7Days,
      datasets: [
        {
          label: 'Ham',
          data: this.getDataCountForType(mails, last7Days, 'ham'),
          fill: false,
          borderColor: '#22c55e',
          borderWidth: 3, // Aumentar el grosor de la línea
          tension: 0.1,
        },
        {
          label: 'Spam',
          data: this.getDataCountForType(mails, last7Days, 'spam'),
          fill: false,
          borderColor: '#ea580c',
          borderWidth: 3, // Aumentar el grosor de la línea
          tension: 0.1
        },
      ]
    };
    

    const ctx = canvas.getContext('2d');

    if (ctx) { // Verificar si el contexto es válido
      new Chart(ctx, {
        type: 'line',
        data: data,        
        options: {          
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },

            }
            
          },
          plugins: {
            title: {
              display: true,
              text: 'Relación de correos Ham y Spam en los últimos 7 días	'
            },
            datalabels:{
              color: '#000',
              font: {
                size: 15,
                weight: 'bold'
              },
              display:( context: any)=> {
                return context.dataset.data[context.dataIndex] !== 0;
              }
              
            }
          }
        },
      });
    } else {
      console.error('No se pudo obtener el contexto del lienzo (canvas).');
    }
  }

  private getLast7Days(): string[] {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push(date.toISOString().substring(0, 10));
    }
    return last7Days;
  }

  private getCountsForLast7Days(mails: MailInfoModel[], last7Days: string[]): number[] {
    return last7Days.map((day) => {
      const count = mails.filter((item) => item.dateOfAnalysis['$date'].startsWith(day)).length;
      return count;
    });
  }

  private getDataCountForType(data: MailInfoModel[], days: any[], type: string): number[] {
    return days.map((day) => {
      const count = data.filter((item) => item.dateOfAnalysis.$date.startsWith(day) && item.prediction === type).length;
      return count;
    });
  }
}
