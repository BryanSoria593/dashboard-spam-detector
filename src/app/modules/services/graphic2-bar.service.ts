import { Injectable } from '@angular/core';
import Chart  from 'chart.js/auto';

import { MailInfoModel, MailReportModel } from 'src/app/core/models/mail/mail.interface';

@Injectable({
  providedIn: 'root'
})
export class Graphic2BarService {

  constructor() { }


  generateBarChart(canvas: HTMLCanvasElement, title: string, alertMails: MailInfoModel[], reportMails: MailReportModel[]) {
    const lastSevenDays = this.getLastSevenDays();
    const groupedData = this.groupDataByDate(alertMails, reportMails);
    
    const ctx = canvas.getContext('2d');
    
    if (ctx) { // Verificar si el contexto es válido
      
      new Chart(ctx, {
        type: 'bar',
        
        data: {
          labels: lastSevenDays,
          datasets: [
            {
              label: 'Alertas enviadas',
              data: this.getDataForCategory(lastSevenDays, groupedData, 'alert'),
              backgroundColor: '#eab308',
              borderWidth: 1
            },
            {
              label: 'Reportes realizados',
              data: this.getDataForCategory(lastSevenDays, groupedData, 'report'),
              backgroundColor: '#ef4444',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true, 
          plugins: {
            title: {
              display: true,
              text: title
            },
            datalabels:{              
              color: '#000',
              font: {
                size: 13,
                weight: 'bold'
              },
              display: function(context: any) {
                return context.dataset.data[context.dataIndex] !== 0;
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }        
        }

      });
    } else {
      console.error('No se pudo obtener el contexto del lienzo (canvas).');
    }
  }

  generateBarChartDay(canvas: HTMLCanvasElement, title: string, alertMails: MailInfoModel[], reportMails: MailReportModel[]) {
    const targetDate = new Date().toLocaleDateString();
    const filteredAlertMails = alertMails.filter(item => item.dateOfAnalysis && new Date(item.dateOfAnalysis['$date']).toLocaleDateString() === targetDate);
    const filteredReportMails = reportMails.filter(item => item.dateOfReport && new Date(item.dateOfReport['$date']).toLocaleDateString() === targetDate);
    const groupedData = this.groupDataByDate(filteredAlertMails, filteredReportMails);

    const ctx = canvas.getContext('2d');

    if (ctx) { // Verificar si el contexto es válido
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [targetDate],
          datasets: [
            {
              label: 'Alertas enviadas',
              data: this.getDataForCategory([targetDate], groupedData, 'alert'),
              backgroundColor: '#eab308',
              borderWidth: 1
            },
            {
              label: 'Reportes realizados',
              data: this.getDataForCategory([targetDate], groupedData, 'report'),
              backgroundColor: '#ef4444',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title
            },
            datalabels: {
              color: '#000',
              font: {
                size: 13,
                weight: 'bold'
              },
              display: function(context: any) {
                return context.dataset.data[context.dataIndex] !== 0;
              }
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }              
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del lienzo (canvas).');
    }
  }

  generateTotalBarChart(canvas: HTMLCanvasElement, title: string, alertMails: MailInfoModel[], reportMails: MailReportModel[]) {
    const groupedData = this.groupDataByDate(alertMails, reportMails);
  
    const totalAlerts = this.getTotalForCategory(groupedData, 'alert');
    const totalReports = this.getTotalForCategory(groupedData, 'report');
  
    const ctx = canvas.getContext('2d');
  
    if (ctx) { // Verificar si el contexto es válido
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total'],
          datasets: [
            {
              label: 'Alertas enviadas',
              data: [totalAlerts],
              backgroundColor: '#eab308',
              borderWidth: 1
            },
            {
              label: 'Reportes realizados',
              data: [totalReports],
              backgroundColor: '#ef4444',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title
            },
            datalabels: {
              color: '#000',
              font: {
                size: 13,
                weight: 'bold'
              },
              display: function(context: any) {
                return context.dataset.data[context.dataIndex] !== 0;
              }
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }              
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del lienzo (canvas).');
    }
  }

  private groupDataByDate(alertMails: MailInfoModel[], reportMails: MailReportModel[]): any {
    const groupedData: any = {};
  
    alertMails.forEach(item => {
      if (item.dateOfAnalysis) {
        const date = new Date(item.dateOfAnalysis.$date).toLocaleDateString();
        if (!groupedData[date]) {
          groupedData[date] = {};
        }
        if (!groupedData[date].alert) {
          groupedData[date].alert = 0;
        }
        if (!groupedData[date].report) {
          groupedData[date].report = 0;
        }               
        if (item.prediction === 'spam') {
          groupedData[date].alert++;
        }
      }
    });
    
  
    reportMails.forEach(item => {
      if (item.dateOfReport) {
        const date = new Date(item.dateOfReport.$date).toLocaleDateString();
        if (!groupedData[date]) {
          groupedData[date] = {};
        }
        if (!groupedData[date].report) {
          groupedData[date].report = 0;
        }
        groupedData[date].report++;
      }
    });
    ;
  
    return groupedData;
  }

  private getLastSevenDays(): string[] {
    const today = new Date();
    const lastSevenDays: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      lastSevenDays.push(date.toLocaleDateString());
    }

    return lastSevenDays;
  }

  private getDataForCategory(lastSevenDays: string[], groupedData: any, category: string): number[] {
    return lastSevenDays.map(day => groupedData[day]?.[category] || 0);
  }
  
  
  private getTotalForCategory(groupedData: any, category: string): number {
    let total = 0;
    for (const date in groupedData) {
      total += groupedData[date]?.[category] || 0;
    }
    return total;
  }
  
}
