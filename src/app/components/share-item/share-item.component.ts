import { Component, Input, OnInit } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';
import { PortfolioItem } from 'src/app/models/PortfolioItem';

@Component({
  selector: 'app-share-item',
  templateUrl: './share-item.component.html',
  styleUrls: ['./share-item.component.scss'],
})
export class ShareItemComponent implements OnInit {
  @Input() item!: PortfolioItem;
  @Input() liveCurrencyTickers: CurrencyTicker[] = [];

  constructor() {}

  ngOnInit(): void {}

  getImageUrl() {
    return this.liveCurrencyTickers.find(
      (currency: CurrencyTicker) => currency.symbol === this.item.symbol
    )?.logo_url;
  }

  getFullName() {
    return this.liveCurrencyTickers.find(
      (currency: CurrencyTicker) => currency.symbol === this.item.symbol
    )?.name;
  }

  getCurrentPrice() {
    let currency = this.liveCurrencyTickers.find(
      (currency: CurrencyTicker) => currency.symbol === this.item.symbol
    );

    if (currency) {
      return parseFloat(currency.price) * this.item.amount;
    } else {
      return '-';
    }
  }
}
