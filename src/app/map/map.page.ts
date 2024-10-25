import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
// Import Leaflet Routing Machine and Geocoder without type checking
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  private map!: L.Map;
  private routingControl: any;

  private jogjaCenter: L.LatLng = new L.LatLng(-7.797068, 110.370529); // Coordinates for Yogyakarta

  constructor() {}

  ngAfterViewInit(): void {
    this.initializeMap();
    this.setupRouting();
  }

  initializeMap() {
    // Create the map centered on Jogja
    this.map = L.map('map').setView(this.jogjaCenter, 13);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Set up event listener for calculating route
    document.getElementById('calculate-route')?.addEventListener('click', () => {
      this.calculateRoute();
    });
  }

  setupRouting() {
    // Set up routing control (cast to `any` due to TypeScript issues with leaflet-routing-machine)
    this.routingControl = (L as any).Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      geocoder: (L.Control as any).Geocoder.nominatim(), // Cast to `any` for Geocoder
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }]
      },
    }).addTo(this.map);
  }

  calculateRoute() {
    // Get input values from the DOM
    const startInput = (document.getElementById('start-location') as HTMLInputElement).value;
    const endInput = (document.getElementById('end-location') as HTMLInputElement).value;

    if (startInput && endInput) {
      // Use the Geocoder to find the start and end locations
      (L.Control as any).Geocoder.nominatim().geocode(startInput, (startResults: any) => {
        (L.Control as any).Geocoder.nominatim().geocode(endInput, (endResults: any) => {
          if (startResults.length > 0 && endResults.length > 0) {
            const startPoint = new L.LatLng(startResults[0].center.lat, startResults[0].center.lng);
            const endPoint = new L.LatLng(endResults[0].center.lat, endResults[0].center.lng);

            // Set new waypoints for routing
            this.routingControl.setWaypoints([startPoint, endPoint]);

            // Calculate distance and emission once route is found
            this.routingControl.on('routesfound', (e: any) => {
              const route = e.routes[0];
              const distanceKm = route.summary.totalDistance / 1000; // Convert meters to kilometers
              const emission = this.calculateEmission(distanceKm);

              // Update the UI with distance and emission results
              document.getElementById('distance')!.innerText = distanceKm.toFixed(2) + ' km';
              document.getElementById('emission')!.innerText = emission.toFixed(2) + ' g/km';
            });
          } else {
            alert('Location not found!');
          }
        });
      });
    } else {
      alert('Please enter both start and end locations.');
    }
  }

  // Function to calculate CO2 emission based on distance
  calculateEmission(distanceKm: number): number {
    const emissionFactor = 120; // Average gCO2/km for a vehicle
    return distanceKm * emissionFactor;
  }
}
