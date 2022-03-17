import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';
import { BuyService } from 'src/app/services/buy.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  @Input() currencyName: string = '';
  @Input() liveCurrencyTickers: CurrencyTicker[] = [];


  amount: string = '';

  constructor(private buyService: BuyService) {}

  ngOnInit(): void {
    this.getSelectedCurrency();
  }

  getSelectedCurrency(): CurrencyTicker | undefined {
    return this.liveCurrencyTickers.find(
      (currency) => currency.name === this.currencyName
    );
  }

  getTrends(currency: CurrencyTicker) {
    return [
      { time: '1-Day', data: currency['1d'] },
      { time: '7-Day', data: currency['7d'] },
      { time: '30-Day', data: currency['30d'] },
      // { time: 'YTD', data: currency['ytd'] },
      { time: '365-Day', data: currency['365d'] },
    ];
  }

  transactionSuccesfull: boolean = true;
  transactionMessage: string = '';
  transactionVissible = false;

  async onBuy(currency: CurrencyTicker) {
    let value = parseFloat(this.amount.replace(',', '.'));
    let succ, message: any;
    if (isNaN(value)) {
      succ = false;
      message = 'Amount must be a number';
    } else {
      [succ, message] = await this.buyService.buy(currency, value);
    }
    this.transactionSuccesfull = succ;
    this.transactionMessage = message;
    this.transactionVissible = true;

    setTimeout(() => {
      this.transactionVissible = false;
    }, 4000);

    if (succ) {
      this.amount = '';
    }
  }

  async onSell(currency: CurrencyTicker) {
    let value = parseFloat(this.amount.replace(',', '.'));
    let succ, message: any;
    if (isNaN(value)) {
      succ = false;
      message = 'Amount must be a number';
    } else {
      [succ, message] = await this.buyService.sell(currency, value);
    }
    this.transactionSuccesfull = succ;
    this.transactionMessage = message;
    this.transactionVissible = true;

    setTimeout(() => {
      this.transactionVissible = false;
    }, 4000);

    if (succ) {
      this.amount = '';
    }
  }

  async onSellAll(currency: CurrencyTicker) {
    let [succ, message] = await this.buyService.sell(currency, Infinity);
    this.transactionSuccesfull = succ;
    this.transactionMessage = message;
    this.transactionVissible = true;

    setTimeout(() => {
      this.transactionVissible = false;
    }, 4000);

    if (succ) {
      this.amount = '';
    }
  }

  async onBuyAll(currency: CurrencyTicker) {
    let [succ, message] = await this.buyService.buy(currency, Infinity);
    this.transactionSuccesfull = succ;
    this.transactionMessage = message;
    this.transactionVissible = true;

    setTimeout(() => {
      this.transactionVissible = false;
    }, 4000);

    if (succ) {
      this.amount = '';
    }
  }
}
