import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonButtons, IonToggle, IonLabel } from '@ionic/angular/standalone';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonButtons, IonToggle, IonLabel],
})
export class HomePage implements OnInit {

weatherData: any;
city: string = "Galway";
temperature: string = "";

  constructor(private weatherService:WeatherService, private storage: Storage) {}
  
  async ngOnInit() {
    await this.storage.create();
    const storedCity = await this.storage.get('city');
    if (storedCity) {
      this.city = storedCity;
      this.getWeather();
    }
  }

  async ionViewWillEnter() {
    await this.storage.create();
    const storedCity = await this.storage.get('city');
    if (storedCity) {
      this.city = storedCity;
      this.getWeather();
    }
  }

  getWeather(): void {
    if (!this.city || this.city.trim().length === 0) return;

    this.weatherService.getWeatherData(this.city).subscribe((data) => {
      this.weatherData = data;
      this.temperature = data.main.temp.toFixed(2);
    });
  }

  async saveCity(): Promise<void> {
    await this.storage.set('city', this.city);
    console.log('City saved to storage:', this.city);
  }

  toggleDarkMode(event: any) {
    console.log('Dark mode toggled:', event.detail.checked);
  document.body.classList.toggle('dark', event.detail.checked);
  }
}
