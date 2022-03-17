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

    let userprofile = this.dataBaseService.getCurrentProfile(user);
    let portfolio = this.dataBaseService.getCurrentPortfolio(user);

    let profile: any = await userprofile.get();
    let money = profile.data().money;

    let buyEverything = false;

    if (amountEuro === Infinity) {
      buyEverything = true;
    }

    if (money < amountEuro && !buyEverything) {
      return [false, 'Not enough money'];
    }

    if (buyEverything) {
      amountEuro = money;
    }

    let amountCrypto = amountEuro / parseFloat(currency.price);

    let batch = this.dataBaseService.createBatch();

    batch.update(portfolio, {
      [currency.symbol]: increment(amountCrypto),
    });

    batch.update(userprofile, {
      money: increment(-amountEuro),
    });

    await batch.commit();

    return [true, 'Transaction successful'];
  }

  async sell(
    currency: CurrencyTicker,
    amountEuro: number
  ): Promise<[boolean, string]> {
    let user = this.auth.User;

    if (!user) {
      return [false, 'Authentification error'];
    }

    let userprofile = this.dataBaseService.getCurrentProfile(user);
    let portfolio = this.dataBaseService.getCurrentPortfolio(user);

    let profile: any = await portfolio.get();

    let amountCrypto = profile.data()[currency.symbol];

    let sellEverything = false;

    if (amountEuro === Infinity) {
      sellEverything = true;
    }

    if (!amountCrypto) {
      return [false, `No ${currency.symbol} in portfolio`];
    }

    let cryptoValueEuro = amountCrypto * parseFloat(currency.price);

    if (amountEuro > cryptoValueEuro && !sellEverything) {
      return [false, `Not enough ${currency.symbol}`];
    }

    let soldCrypto = amountEuro / parseFloat(currency.price);

    if (sellEverything) {
      soldCrypto = amountCrypto;
      amountEuro = cryptoValueEuro;
    }

    let batch = this.dataBaseService.createBatch();

    batch.update(portfolio, {
      [currency.symbol]: increment(-soldCrypto),
    });

    batch.update(userprofile, {
      money: increment(amountEuro),
    });

    await batch.commit();

    if (sellEverything || soldCrypto === amountCrypto) {
      this.dataBaseService.deleteCurrency(user, currency.symbol);
      return [true, 'Sold everything'];
    }

    return [true, 'Transaction successful'];
  }
}
