import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = "5e495e465bda9abe664adcc172c571c0";

  constructor(private httpClient:HttpClient) { }

  getWeatherData(city: string): Observable<any> {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.httpClient.get(url);
  }
}
