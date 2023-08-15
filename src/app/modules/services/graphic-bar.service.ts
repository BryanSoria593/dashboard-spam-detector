import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';
import { MailInfoModel } from 'src/app/core/models/mail/mail.interface';

@Injectable({
  providedIn: 'root'
})
export class GraphicBarService {

  constructor() { }

  generateBarChart(canvas: HTMLCanvasElement, title: string, label1: string, label2: string, color1: string, color2: string, data: MailInfoModel[], filter1: string, filter2: string) {
    const groupedData = this.groupDataByDate(data);
    const lastSevenDays = this.getLastSevenDays();

    this.generateBarChartWithLabels(canvas, title, label1, label2, color1, color2, lastSevenDays, groupedData, filter1, filter2);
  }

  generateBarChartDay(canvas: HTMLCanvasElement, title: string, label1: string, label2: string, color1: string, color2: string, data: MailInfoModel[], filter1: string, filter2: string, targetDate: Date) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return; 
    }

    
    const targetDay = targetDate.toLocaleDateString();
    const filteredData = data.filter(item => new Date(item.dateOfAnalysis['$date']).toLocaleDateString() === targetDay);

    
    const groupedData = this.groupDataByDate(filteredData);

    
    const targetDayLabel = targetDate.toLocaleDateString();

    this.generateBarChartWithLabels(canvas, title, label1, label2, color1, color2, [targetDayLabel], groupedData, filter1, filter2);
  }

  generateTotalBarChart(canvas: HTMLCanvasElement, title: string, label1: string, label2: string, color1: string, color2: string, data: MailInfoModel[], filter1: string, filter2: string) {
    const groupedData = this.groupDataByDate(data);

    const totalData = this.calculateTotalData(groupedData, filter1, filter2);
    const totalLabels = ['Total'];

    this.generateBarChartWithLabels(canvas, title, label1, label2, color1, color2, totalLabels, totalData, filter1, filter2);
  }

  private generateBarChartWithLabels(canvas: HTMLCanvasElement, title: string, label1: string, label2: string, color1: string, color2: string, labels: string[], groupedData: any, filter1: string, filter2: string) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label1,
            data: this.getDataForCategory(labels, groupedData, filter1),
            backgroundColor: color1,
            borderWidth: 1
          },
          {
            label: label2,
            data: this.getDataForCategory(labels, groupedData, filter2),
            backgroundColor: color2,
            borderWidth: 1
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
          },
          datalabels: {
            color: '#000',
            font: {
              size: 13,
              weight: 'bold'
            },
            display: (context: any) => {
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
  }

  private groupDataByDate(data: MailInfoModel[]): any {
    const groupedData: any = {};

    data.forEach(item => {
      const date = new Date(item.dateOfAnalysis['$date']).toLocaleDateString();
      if (!groupedData[date]) {
        groupedData[date] = {};
      }
      if (!groupedData[date][item.prediction]) {
        groupedData[date][item.prediction] = 0;
      }
      groupedData[date][item.prediction]++;
    });

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

  private calculateTotalData(groupedData: any, filter1: string, filter2: string): any {
    const totalData: any = {
      'Total': {}
    };

    Object.keys(groupedData).forEach(date => {
      totalData['Total'][filter1] = (totalData['Total'][filter1] || 0) + (groupedData[date]?.[filter1] || 0);
      totalData['Total'][filter2] = (totalData['Total'][filter2] || 0) + (groupedData[date]?.[filter2] || 0);
    });

    return totalData;
  }

  private getDataForCategory(labels: string[], groupedData: any, category: string): number[] {
    return labels.map(date => groupedData[date]?.[category] || 0);
  }

}
