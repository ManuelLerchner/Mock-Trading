import { Injectable } from '@angular/core';
import { CurrencyTicker } from '../models/CurrencyTicker';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class BuyService {
  constructor(private auth: AuthService, private db: DatabaseService) {}

  trade(currency: CurrencyTicker, amount: number) {
    let user = this.auth.User;

    if (user) {
      this.db.updatePortfolio(user, {
        symbol: currency.symbol,
        amount: amount,
      });
    }
  }
}
