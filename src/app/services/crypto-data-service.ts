import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CurrencyTicker } from '../models/CurrencyTicker';

@Injectable({
  providedIn: 'root',
})
export class CryptoDataService {
  constructor() {}

  currencyNames: string[] = [
    'BTC',
    'ETH',
    'XRP',
    'DOGE',
    'USDT',
    'SOL',
    'BNB',
    'LUNA',
    'HEX',
    'SHIB',
    'MATIC',
    'ATOM',
    'TRX',
    'MANA',
    'ICP',
    '1INCH',
  ];

  fetchData(): Observable<CurrencyTicker[]> {
    const url =
      environment.apiUrl +
      `/currencies/ticker?ids=${this.currencyNames}&convert=EUR&per-page=100&page=1`;

    const apiCall = fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        return responseJson as CurrencyTicker[];
      })
      .catch((error: any) => {
        console.log(error);
        return [];
      });

    return from(apiCall);
  }
}
