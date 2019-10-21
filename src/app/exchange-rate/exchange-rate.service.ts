import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private httpClient: HttpClient) { }

  exchangeRateDolar() {
    return this.httpClient.get('http://www.apilayer.net/api/live?access_key=' + environment.APIAccessKey + '&format=1&currencies=PEN');
  }


}
