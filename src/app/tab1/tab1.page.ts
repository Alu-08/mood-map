import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, personOutline, filterOutline, star, chevronDownOutline, closeCircleOutline } from 'ionicons/icons';
import { Place, PlacesService } from '../services/places.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonContent, IonIcon]
})
export class Tab1Page {
  private placesService = inject(PlacesService);
  private router = inject(Router);

  public searchText: string = '';
  public showFilterMenu: boolean = false;

  // Lugar abierto en la tarjeta de detalle
  public selectedPlace: Place | null = null;

  // Filtros seleccionados
  public selectedCategory: string = 'all'; // 'all', 'cafe', 'bar', 'resto', 'helado'
  public selectedMood: string = 'all';

  // Opciones de Mood disponibles
  public moodOptions: string[] = [
    'Clásico',
    'Ruidoso',
    'Tranquilo',
    'Rockero',
    'Amigos',
    'Noche',
    'Casual',
    'Familiar',
    'Tradicional'
  ];

  // La lista viene del servicio compartido con la tab 2
  public places: Place[] = this.placesService.places;

  constructor() {
    addIcons({ searchOutline, personOutline, filterOutline, star, chevronDownOutline, closeCircleOutline });
  }

  // Lleva a la pantalla de inicio de sesión (tab 3)
  goToLogin() {
    this.router.navigateByUrl('/tabs/tab3');
  }

  // --- Tarjeta de detalle ---
  openPlace(place: Place) {
    this.selectedPlace = place;
  }

  closePlace() {
    this.selectedPlace = null;
  }

  // Separa "Tranquilo, Casual" en ['Tranquilo', 'Casual'] para mostrar chips
  moodsOf(place: Place): string[] {
    return place.mood.split(',').map(m => m.trim()).filter(m => m);
  }

  // Abre el lugar en Google Maps, donde están todas las reseñas reales
  googleReviewsUrl(place: Place): string {
    const query = `${place.name} ${place.address} Cipolletti Río Negro`;
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
  }

  // --- Filtros ---
  toggleFilterMenu() {
    this.showFilterMenu = !this.showFilterMenu;
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  setMood(mood: string) {
    this.selectedMood = mood;
  }

  resetFilters() {
    this.selectedCategory = 'all';
    this.selectedMood = 'all';
    this.searchText = '';
  }

  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // Filtrado acumulativo en tiempo real
  get filteredPlaces(): Place[] {
    const query = this.normalizeText(this.searchText.trim());

    return this.places.filter(place => {
      const matchCategory = this.selectedCategory === 'all' || place.categoryType === this.selectedCategory;

      const matchMood = this.selectedMood === 'all' || this.normalizeText(place.mood).includes(this.normalizeText(this.selectedMood));

      const matchSearch = !query ||
        this.normalizeText(place.name).includes(query) ||
        this.normalizeText(place.category).includes(query) ||
        this.normalizeText(place.mood).includes(query) ||
        this.normalizeText(place.description).includes(query) ||
        this.normalizeText(place.address).includes(query);

      return matchCategory && matchMood && matchSearch;
    });
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.selectedCategory !== 'all') count++;
    if (this.selectedMood !== 'all') count++;
    return count;
  }
}