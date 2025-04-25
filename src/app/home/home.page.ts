import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonButtons, IonToggle, IonLabel, } from '@ionic/angular/standalone';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { RouterLink } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [RouterLink, CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonButtons, IonToggle, IonLabel,],
})
export class HomePage implements OnInit {

weatherData: any;
city: string = "Galway"; //Default city
temperature: string = "";
isCelsius: boolean = true;
coordinates: any = "";
lat: string = "";
long: string = "";
location: string = "Weather in " + this.city;


  constructor(private weatherService:WeatherService, private storage: Storage) {}
  
  async ngOnInit() {
    await this.storage.create();
    const storedCity = await this.storage.get('city');
    if (storedCity) {
      this.city = storedCity;
    }
  
    const storedUnit = localStorage.getItem('isCelsius');
    if (storedUnit !== null) {
      this.isCelsius = JSON.parse(storedUnit);
    }
  
    this.getWeather();
  }
  
  async ionViewWillEnter() {
    await this.storage.create();
    const storedCity = await this.storage.get('city');
    if (storedCity) {
      this.city = storedCity;
    }
  
    const storedUnit = localStorage.getItem('isCelsius');
    if (storedUnit !== null) {
      this.isCelsius = JSON.parse(storedUnit);
    }
  
    this.getWeather();
  }

  getWeather(): void {
    //Checking if city name is valid
    if (!this.city || this.city.trim().length === 0) return;

    this.weatherService.getWeatherData(this.city).subscribe((data) => {
      this.weatherData = data;
      this.temperature = data.main.temp.toFixed(2);
      this.updateTemperature(data.main.temp);
      this.location = "Weather in " + this.city; 
    });
  }

  updateTemperature(tempInCelsius: number): void {
    //Converting temperature units
    if (this.isCelsius) {
      this.temperature = tempInCelsius.toFixed(2); //Celsius
    } else {
      this.temperature = (tempInCelsius * 9/5 +32).toFixed(2); //Fahrenheit
    }
  }

  //Save city to storage
  async saveCity(): Promise<void> {
    await this.storage.set('city', this.city);
    console.log('City saved to storage:', this.city);
  }

  //Get current location
  async getGPS() {
    this.coordinates = await Geolocation.getCurrentPosition();
    this.lat = this.coordinates.coords.latitude;
    this.long = this.coordinates.coords.longitude;
    this.getWeatherGPS();
  }

  //Get weather based on user's location
  getWeatherGPS(): void {
    this.weatherService.getWeatherDataByCoords(this.lat, this.long).subscribe((data) => {
      console.log('Weather in current location is:', data);
      this.temperature = data.main.temp.toFixed(2);
      this.city = "";
      this.location = "Weather based on your location is ";
    });
  }
  
}
