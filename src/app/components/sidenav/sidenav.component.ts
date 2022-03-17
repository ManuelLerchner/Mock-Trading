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
        this.priceDeltas[ticker.symbol] = [newPrice, 0, 0, ''];
      } else {
        let oldPrice = oldDelta[0];

        let newPercents = oldDelta[1];
        let newChanges = oldDelta[2];

        let newDir = oldDelta[3];

        if (newPrice !== oldPrice) {
          newDir = newPrice > oldPrice ? 'increase' : 'decrease';
          newPercents = newPrice / oldPrice - 1;
          newChanges = newPrice - oldPrice;
        }

        this.priceDeltas[ticker.symbol] = [
          newPrice,
          newPercents,
          newChanges,
          newDir,
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
