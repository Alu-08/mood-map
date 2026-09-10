import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline, mapOutline, personOutline, addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon]
})
export class TabsPage {
  constructor() {
    addIcons({ homeOutline, mapOutline, personOutline, addCircleOutline });
  }
}