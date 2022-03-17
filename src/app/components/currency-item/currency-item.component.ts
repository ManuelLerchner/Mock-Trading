import * as fa from '@fortawesome/free-solid-svg-icons';

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';

@Component({
  selector: 'app-currency-item',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent implements OnInit {
  @Input() currency!: CurrencyTicker;
  @Input() selected: boolean = false;
  @Input() valueChanges: any = {};
  @Input() priceDeltas: any = {};
  @Output() selectedEvent = new EventEmitter<string>();

  fa: any = fa;

  change: 'increase' | 'decrease' | '' = '';
  priceIncreasePrct: string = '';
  priceIncreaseAbsolute: any = '';

  ngOnInit(): void {
    let delta = this.priceDeltas[this.currency.symbol];
    this.priceIncreasePrct = delta[1];
    this.priceIncreaseAbsolute = delta[2];

    if (this.priceIncreaseAbsolute > 0) {
      this.change = 'increase';
    } else if (delta < 0) {
      this.change = 'decrease';
    } else {
      this.change = '';
    }
  }

  formatIncrease() {
    if (this.priceIncreaseAbsolute > this.priceIncreasePrct) {
      return this.priceIncreaseAbsolute;
    } else {
      return parseFloat(this.priceIncreasePrct) * 100;
    }
  }
  getUnit() {
    if (this.priceIncreaseAbsolute > this.priceIncreasePrct) {
      return '€';
    } else {
      return '%';
    }
  }

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }

  select() {
    this.selectedEvent.emit(this.currency?.name);
  }
}
