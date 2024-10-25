import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage implements OnInit {

  emissions = [
    { name: 'Karbon Dioksida (CO2)', value: '29.6 kg', change: 10, icon: 'leaf' },
    { name: 'Karbon Monoksida (CO)', value: '12.5 kg', change: 8, icon: 'car' },
    { name: 'Metana (CH4)', value: '9.4 kg', change: -5, icon: 'flame' },
    { name: 'Nitrogen Oksida (NO2)', value: '6.5 kg', change: -3, icon: 'cloudy' },
  ];

  gasDominations = [
    { name: 'Karbon Dioksida (CO2)', percentage: 46 },
    { name: 'Karbon Monoksida (CO)', percentage: 17 },
    { name: 'Metana (CH4)', percentage: 19 },
    { name: 'Nitrogen Oksida (NO2)', percentage: 29 },
  ];

  constructor() {}

  ngOnInit() {
    this.loadAirQualityChart();
  }

  loadAirQualityChart() {
    const ctx = document.getElementById('airQualityChart') as HTMLCanvasElement;
    const airQualityChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Kapasitas Gas Buangan',
            data: [50, 150, 100, 200, 250, 300, 350, 400, 450, 500, 550, 600],
            fill: true,
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: '#007bff',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
