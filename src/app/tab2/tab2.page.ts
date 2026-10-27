import { Component, NgZone, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, personOutline, locationOutline, star } from 'ionicons/icons';
import * as L from 'leaflet';
import { Place, PlacesService } from '../services/places.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonContent, IonIcon]
})
export class Tab2Page {
  private placesService = inject(PlacesService);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  public searchText = '';
  public selectedPlace: Place | null = null;

  private map?: L.Map;
  private markersLayer = L.layerGroup();
  private markers = new Map<number, L.Marker>();
  private coords = new Map<number, { lat: number; lng: number }>();

  constructor() {
    addIcons({ searchOutline, personOutline, locationOutline, star });
  }

  // Lleva a la pantalla de inicio de sesión (tab 3)
  goToLogin() {
    this.router.navigateByUrl('/tabs/tab3');
  }

  // Se ejecuta cada vez que entrás a la tab
  ionViewDidEnter() {
    if (!this.map) {
      this.initMap();
    }
    this.map!.invalidateSize();
  }

  private initMap() {
    this.map = L.map('map', { zoomControl: false }).setView([-38.9335, -67.9900], 15);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.loadCoords();
  }

  // Busca la ubicación de cada lugar y va dibujando los pines
  private async loadCoords() {
    for (const place of this.placesService.places) {
      const c = await this.placesService.getCoords(place);
      if (c) {
        this.coords.set(place.id, c);
        this.renderMarkers();
      } else {
        console.warn('No se encontró ubicación para:', place.name, '-', place.address);
      }
    }

    if (this.coords.size > 0) {
      const points = Array.from(this.coords.values()).map(c => [c.lat, c.lng] as [number, number]);
      this.map?.fitBounds(L.latLngBounds(points), { padding: [60, 60] });
    }
  }

  // Arma el ícono de un pin (amarillo si está seleccionado)
  private buildIcon(place: Place, selected: boolean): L.DivIcon {
    const emoji = this.placesService.emojiByType[place.categoryType];
    return L.divIcon({
      className: 'mm-marker',
      html: `<div class="mm-wrap ${selected ? 'mm-active' : ''}">
               <div class="mm-pin"><span>${emoji}</span></div>
               <div class="mm-name">${place.name}</div>
             </div>`,
      iconSize: [140, 80],
      iconAnchor: [70, 48]
    });
  }

  // Dibuja todos los pines (solo se usa al cargar o al buscar)
  private renderMarkers() {
    this.markersLayer.clearLayers();
    this.markers.clear();
    const q = this.normalize(this.searchText.trim());

    this.placesService.places.forEach(place => {
      const c = this.coords.get(place.id);
      if (!c) return;
      if (q && !this.matches(place, q)) return;

      const selected = this.selectedPlace?.id === place.id;

      const marker = L.marker([c.lat, c.lng], {
        icon: this.buildIcon(place, selected),
        zIndexOffset: selected ? 1000 : 0
      });

      marker.on('click', (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e.originalEvent);
        this.ngZone.run(() => this.selectPlace(place));
      });

      marker.addTo(this.markersLayer);
      this.markers.set(place.id, marker);
    });
  }

  // Cambia solo el aspecto de un pin, sin redibujar todos
  private refreshMarker(place: Place | null) {
    if (!place) return;
    const marker = this.markers.get(place.id);
    if (!marker) return;
    const selected = this.selectedPlace?.id === place.id;
    marker.setIcon(this.buildIcon(place, selected));
    marker.setZIndexOffset(selected ? 1000 : 0);
  }

  // Abre la tarjeta con descripción, dirección y puntaje
  selectPlace(place: Place) {
    const previous = this.selectedPlace;
    this.selectedPlace = place;

    this.refreshMarker(previous);
    this.refreshMarker(place);

    const c = this.coords.get(place.id);
    if (c) this.map?.panTo([c.lat, c.lng]);

    this.cdr.detectChanges(); // fuerza a mostrar la tarjeta
  }

  closeCard() {
    const previous = this.selectedPlace;
    this.selectedPlace = null;
    this.refreshMarker(previous);
    this.cdr.detectChanges();
  }

  onSearchChange() {
    this.renderMarkers();
    const q = this.normalize(this.searchText.trim());
    if (!q) return;
    const found = this.placesService.places.filter(p => this.coords.has(p.id) && this.matches(p, q));
    if (found.length === 1) this.selectPlace(found[0]);
  }

  private matches(p: Place, q: string): boolean {
    return (
      this.normalize(p.name).includes(q) ||
      this.normalize(p.category).includes(q) ||
      this.normalize(p.mood).includes(q)
    );
  }

  private normalize(t: string) {
    return t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}