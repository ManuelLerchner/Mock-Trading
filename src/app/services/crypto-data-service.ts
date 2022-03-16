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

  fetchData(currencyIds: string[]): Observable<CurrencyTicker[]> {
    const url =
      environment.apiUrl +
      `/currencies/ticker?ids=${currencyIds}&convert=EUR&per-page=100&page=1`;

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
