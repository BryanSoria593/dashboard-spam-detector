import { Injectable } from '@angular/core';
import  Chart from 'chart.js/auto';


@Injectable({
  providedIn: 'root'
})
export class GraphicHorizontalBarService {

  constructor() { }

  renderChart(canvas: HTMLCanvasElement, title: string, labels: string[], data: number[]): void {
    const ctx = canvas.getContext('2d');

    if (ctx) { // Verificar si el contexto es válido
      new Chart(ctx, {
        type: 'bar',
        data: {
          
          labels: labels,
          datasets: [{
            label: 'Cantidad de correos',
            data: data,
            backgroundColor: '#ef4444',
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: title,
            },
            datalabels:{
              color: '#000',    
              font: {
                size: 13,
                weight: 'bold'
              }          
            }
          }
        }
      });
    } else {
      console.error('No se pudo obtener el contexto del lienzo (canvas).');
    }
  }
}
