import { Injectable } from '@angular/core';
import { CurrencyTicker } from '../models/CurrencyTicker';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class BuyService {
  constructor(
    private auth: AuthService,
    private dataBaseService: DatabaseService
  ) {}

  trade(currency: CurrencyTicker, amountEuro: number) {
    let user = this.auth.User;

    if (user) {
      let amountCrypto = amountEuro / parseFloat(currency.price);

      this.dataBaseService.updatePortfolio(user, {
        symbol: currency.symbol,
        amount: amountCrypto,
      });

      let userRef = this.dataBaseService.getCurrentUser(user);

      if (!userRef) {
        return;
      }

      userRef.get().then((snapshot: any) => {
        let data = snapshot.data();
        let oldUserMoney = data.money;

        if (user) {
          this.dataBaseService.updateUser(user, {
            money: oldUserMoney - amountEuro,
          });
        }
      });
    }
  }
}
