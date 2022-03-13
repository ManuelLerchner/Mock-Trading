import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  @Input() currencyName: string = '';
  @Input() liveCurrencyTickers: CurrencyTicker[] = [];

  amount: number = 500;

  currency!: CurrencyTicker;

  constructor() {}

  ngOnInit(): void {
    this.getSelectedCurrency();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currency = this.getSelectedCurrency();
  }

  getSelectedCurrency(): CurrencyTicker {
    let res = this.liveCurrencyTickers.find(
      (currency) => currency.name === this.currencyName
    );

    if (res === undefined) {
      res = {
        symbol: '',
        name: '-',
        price: '',
        logo_url: '',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      };
    }

    return res;
  }

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }

  getTrends() {
    let data = [
      { time: '1-Day', data: this.currency['1d'] },
      { time: '7-Day', data: this.currency['7d'] },
      { time: '30-Day', data: this.currency['30d'] },
      { time: 'YTD', data: this.currency['ytd'] },
      { time: '365-Day', data: this.currency['365d'] },
    ];
    return data;
  }

  onBuy() {
    console.log(this.amount);
    this.amount = 0;
  }

  onSell() {
    console.log(this.amount);
    this.amount = 0;
  }
}
