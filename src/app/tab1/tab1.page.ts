import { Component } from '@angular/core';
import { IonHeader, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonContent, IonIcon]
})
export class Tab1Page {
  constructor() {
    addIcons({ searchOutline, personOutline });
  }
}
