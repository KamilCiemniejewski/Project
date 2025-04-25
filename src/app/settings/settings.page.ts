import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonToggle, IonItem, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonToggle, IonItem, IonButtons, IonBackButton]
})
export class SettingsPage implements OnInit {

isDarkMode = false;
isCelsius = true;

  constructor() { }

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    const storedUnit = localStorage.getItem('isCelsius');
    if (storedUnit !== null) {
      this.isCelsius = JSON.parse(storedUnit);  // Set the temperature unit
    }
  }

  toggleDarkMode(event: any) {
    console.log('Dark mode toggled:', event.detail.checked);
  document.body.classList.toggle('dark', event.detail.checked);
  }

  toggleTemperatureUnit(event: any) {
    this.isCelsius = event.detail.checked;
    localStorage.setItem('isCelsius', JSON.stringify(this.isCelsius));  // Save the temperature preference to local storage
    console.log('Temperature unit set to:', this.isCelsius ? 'Celsius' : 'Fahrenheit');
  }

}
