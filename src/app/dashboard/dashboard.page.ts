import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  // Properti untuk menyimpan data yang akan digunakan pada dashboard
  title: string = 'Dashboard Pemantauan Karbon';
  features: Array<any> = [
    {
      title: 'Informasi CCS (Carbon Capture and Storage)',
      description: 'Informasi umum terkait perkembangan teknologi untuk mengurangi emisi gas karbon menuju atmosfer.'
    },
    {
      title: 'Peta Distribusi Karbon',
      description: 'Temukan area tempatmu berada dan ketahui besaran emisinya!'
    },
    {
      title: 'Rekap Informasi Karbon',
      description: 'Analisis prediktif terhadap emisi karbon untuk mendukung pembangunan berkelanjutan.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Logic yang ingin dijalankan ketika komponen diinisialisasi
    console.log('DashboardPage initialized');
  }
}
