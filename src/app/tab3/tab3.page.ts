import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personOutline, logoGoogle, logoApple } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonContent, IonIcon]
})
export class Tab3Page {
  public email: string = '';
  public confirmEmail: string = '';
  public password: string = '';

  constructor() {
    addIcons({ personOutline, logoGoogle, logoApple });
  }

  onLogin() {
    console.log('Iniciar sesión con:', this.email);
  }

  onGoogleLogin() {
    console.log('Iniciar sesión con Google');
  }

  onAppleLogin() {
    console.log('Iniciar sesión con Apple');
  }
}