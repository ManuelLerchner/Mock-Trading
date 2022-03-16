import { Injectable } from '@angular/core';
import { increment } from '@angular/fire/firestore';
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

  async buy(
    currency: CurrencyTicker,
    amountEuro: number
  ): Promise<[boolean, string]> {
    let user = this.auth.User;

    if (!user) {
      return [false, 'Authentification error'];
    }

    let result: any;

    await this.dataBaseService
      .getCurrentProfile(user)
      .get()
      .then((data: any) => {
        let userData = data.data();
        let money = userData.money;
        let user = this.auth.User;

        if (money < amountEuro) {
          result = [false, 'Not enough money'];
          return;
        }

        if (!user) {
          result = [false, 'Authentification error'];
          return;
        }

        let amountCrypto = amountEuro / parseFloat(currency.price);

        this.dataBaseService.updatePortfolioWithTransaction(user, {
          symbol: currency.symbol,
          amount: amountCrypto,
        });

        this.dataBaseService.updateProfile(user, {
          money: increment(-amountEuro),
        });

        result = [true, 'Transaction successful'];
      })
      .catch((error) => {
        console.log(error);
        result = [false, 'An error occurred'];
      });

    return result;
  }

  async sell(
    currency: CurrencyTicker,
    amountEuro: number
  ): Promise<[boolean, string]> {
    let user = this.auth.User;

    if (!user) {
      return [false, 'Authentification error'];
    }

    let result: any;
    let sellEverything = false;

    if (amountEuro === Infinity) {
      sellEverything = true;
    }

    await this.dataBaseService
      .getCurrentPortfolio(user)
      .get()
      .then((data: any) => {
        let userData = data.data();
        let amountCrypto = userData[currency.symbol];

        let amountCryptoEuro = amountCrypto * parseFloat(currency.price);
        let user = this.auth.User;

        if (amountEuro > amountCryptoEuro && !sellEverything) {
          result = [false, `Not enough ${currency.symbol}`];
          return;
        }

        if (!amountCrypto) {
          result = [false, `No ${currency.symbol} in portfolio`];
          return;
        }

        if (!user) {
          result = [false, 'Authentification error'];
          return;
        }

        let soldCrypto = amountEuro / parseFloat(currency.price);

        if (sellEverything) {
          soldCrypto = amountCrypto;
          amountEuro = amountCryptoEuro;
        }

        let update: any = {};
        update[currency.symbol] = increment(-soldCrypto);

        this.dataBaseService.updatePortfolio(user, update);

        this.dataBaseService.updateProfile(user, {
          money: increment(amountEuro),
        });

        if (sellEverything) {
          this.dataBaseService.deleteCurrency(user, currency.symbol);

          result = [true, 'Sold everything'];
          return;
        }

        result = [true, 'Transaction successful'];
      })
      .catch((error) => {
        console.log(error);
        result = [false, 'An error occurred'];
      });

    return result;
  }
}
