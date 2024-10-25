import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map!: L.Map;
  baseMaps: any;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // Cek apakah peta sudah ada, jika iya, gunakan invalidateSize
    if (this.map) {
      this.map.invalidateSize();
      return;
    }

    // Membuat peta dan mengatur tampilan awalnya
    this.map = L.map('mapId').setView([-6.966667, 110.416664], 14);

    // Menambahkan tile layer dari OpenStreetMap
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const satellite = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
    });

    // Menambahkan Google Streets dan Google Hybrid
    const googleStreets = L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google'
    });

    const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      attribution: '&copy; Google'
    });

    // Menyimpan baseMaps
    this.baseMaps = {
      'OpenStreetMap': osm,
      'Satellite': satellite,
      'GoogleStreets': googleStreets,
      'GoogleHybrid': googleHybrid
    };

    const Icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41], // Ukuran ikon
      iconAnchor: [12, 41], // Titik di mana ikon akan diposisikan
      popupAnchor: [1, -34], // Lokasi popup terkait ikon
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41] // Ukuran bayangan
    });

    const popupContent = `
      <b>Semarang</b><br>Hai, Kita di Semarang.<br>
      <img src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/06/2023/12/14/kota-semarang-3079536016.jpeg"
      alt="Semarang" style="width: 200px; height: auto;">
    `;
    const popup = L.popup().setContent(popupContent);


    const marker = L.marker([-6.966667, 110.416664], { icon: Icon })
      .bindPopup(popup)
      .addTo(this.map)
      .openPopup();
  }

  onBasemapChange(event: any) {
    const selectedBasemap = event.detail.value;

    // Menghapus layer yang sudah ada
    Object.keys(this.baseMaps).forEach((key) => {
      this.map.removeLayer(this.baseMaps[key]);
    });

    // Menambahkan layer basemap baru berdasarkan pilihan
    this.baseMaps[selectedBasemap].addTo(this.map);
  }
}
