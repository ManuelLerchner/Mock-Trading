import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  constructor() {}
  @Input() liveCurrencyTickers: CurrencyTicker[] = [];
  @Output() selectEvent: EventEmitter<string> = new EventEmitter();
  @Input() isExpanded = true;
  @Input() updateCounter: any = 0;

  @Input() selected: string = '';

  oldTickers: any = [];

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.liveCurrencyTickers.forEach((ticker: any) => {
      let oldDelta = this.priceDeltas[ticker.symbol];
      let newPrice = ticker.price;

      if (oldDelta === undefined) {
        this.priceDeltas[ticker.symbol] = [newPrice, 0, 0];
      } else {
        let oldPrice = oldDelta[0];

        this.priceDeltas[ticker.symbol] = [
          newPrice,
          newPrice / oldPrice - 1,
          newPrice - oldPrice,
        ];
      }
    });
  }

  priceDeltas: any = {};

  onSelect(currency: string): void {
    this.selected = currency;
    this.selectEvent.emit(currency);
  }
}
