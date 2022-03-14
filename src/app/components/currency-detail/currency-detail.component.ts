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

  amount: number = 500;

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
      { time: 'YTD', data: currency['ytd'] },
      { time: '365-Day', data: currency['365d'] },
    ];
  }

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }

  onBuy(currency: CurrencyTicker) {
    this.buyService.trade(currency, this.amount);
    this.amount = 0;
  }

  onSell(currency: CurrencyTicker) {
    this.buyService.trade(currency, -this.amount);
    this.amount = 0;
  }
}
