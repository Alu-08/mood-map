import { Component, AfterViewInit } from '@angular/core';
import { IonHeader, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, personOutline, locateOutline } from 'ionicons/icons';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonContent, IonIcon]
})
export class Tab2Page implements AfterViewInit {
  private map!: L.Map;

  constructor() {
    addIcons({ searchOutline, personOutline, locateOutline });
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap(): void {
    // Coordenadas del centro de Cipolletti
    const cipollettiCoords: L.LatLngExpression = [-38.9398, -67.9928];

    // Inicializar mapa sin controles de zoom por defecto (usamos los personalizados)
    this.map = L.map('map', {
      zoomControl: false
    }).setView(cipollettiCoords, 15);

    // Cargar mapa visual tipo OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Agregar cafeterías reales de Cipolletti
    this.addRealPlaces();

    // Forzar redibujado para evitar áreas grises
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }

  private addRealPlaces() {
    // 1. Cafetería Destacada con foto estilo MoodMap
    const featuredIcon = L.divIcon({
      className: 'custom-pin-highlight',
      html: `
        <div class="avatar-circle">
          <img src="assets/images/rincon_de_coffee.png" alt="Rincón de Coffee" />
        </div>
        <div class="pin-card">
          <h3>Rincón de Coffee</h3>
          <p>Música Lo-Fi, Poca Gente</p>
        </div>
      `,
      iconSize: [160, 100],
      iconAnchor: [80, 50]
    });

    // Ubicación cerca del centro (Roca y España aprox.)
    L.marker([-38.9395, -67.9915], { icon: featuredIcon }).addTo(this.map);

    // 2. Otras cafeterías reales de Cipolletti con etiquetas
    const places = [
      { name: 'Barstow Coffee', mood: 'Luz Natural, Trabajo', coords: [-38.9372, -67.9940] },
      { name: 'Café Martínez', mood: 'Clásico, Ruidoso', coords: [-38.9412, -67.9902] },
      { name: 'Klover Café', mood: 'Tranquilo, Lectura', coords: [-38.9388, -67.9880] }
    ];

    places.forEach(place => {
      const labelIcon = L.divIcon({
        className: 'custom-pin-label',
        html: `<span>☕ ${place.name}</span>`,
        iconSize: [120, 30],
        iconAnchor: [60, 15]
      });

      L.marker(place.coords as L.LatLngExpression, { icon: labelIcon })
        .addTo(this.map)
        .bindPopup(`<b>${place.name}</b><br>${place.mood}`);
    });
  }

  // Funciones para botones flotantes
  zoomIn() {
    this.map.zoomIn();
  }

  zoomOut() {
    this.map.zoomOut();
  }

  centerOnCipolletti() {
    this.map.setView([-38.9398, -67.9928], 16);
  }
}
