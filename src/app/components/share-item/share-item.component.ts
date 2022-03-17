import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
  @Input() selected: string = '';
  @Output() selectedCurrencyEvent = new EventEmitter<string>();

  constructor() {}

  change: 'increase' | 'decrease' | '' = '';
  oldAmount: number = -1;
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

    if (currency?.price) {
      return parseFloat(currency.price) * this.item.amount;
    } else {
      return '';
    }
  }

  onClick() {
    this.selectedCurrencyEvent.emit(this.getFullName());
  }

  ngOnChanges(changes: SimpleChanges): void {
    let currency = this.liveCurrencyTickers.find(
      (currency: CurrencyTicker) => currency.symbol === this.item.symbol
    );

    if (currency) {
      let newValue = parseFloat(currency.price) * this.item.amount;

      if (this.oldAmount !== -1) {
        if (newValue !== this.oldAmount) {
          if (newValue > this.oldAmount) {
            this.change = 'increase';
          } else if (newValue < this.oldAmount) {
            this.change = 'decrease';
          } else {
            this.change = '';
          }
        }
      }

      this.oldAmount = newValue;

      setTimeout(() => {
        this.change = '';
      }, 6000);
    }
  }
}
