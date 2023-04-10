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

  currencyNamesClear = [
    'bitcoin',
    'ethereum',
    'ripple',
    'dogecoin',
    'tether',
    'solana',
    'binance-coin',
    'terra-luna',
    'hex',
    'shiba-inu',
    'matic-network',
    'cosmos',
    'tron',
    'decentraland',
    'internet-computer',
    '1inch',
    'audius',
    'sushi',
    'dydx',
    'fx-coin',
  ];

  fetchData(): Observable<CurrencyTicker[]> {
    const url = environment.apiUrl + `?ids=${this.currencyNamesClear}`;

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
