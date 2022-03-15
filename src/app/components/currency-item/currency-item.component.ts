import * as fa from '@fortawesome/free-solid-svg-icons';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';

@Component({
  selector: 'app-currency',
  templateUrl: './currency-item.component.html',
  styleUrls: ['./currency-item.component.scss'],
})
export class CurrencyItemComponent implements OnInit {
  @Input() currency!: CurrencyTicker;
  @Output() selectedEvent = new EventEmitter<string>();

  fa: any = fa;

  ngOnInit(): void {}

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }

  select() {
    this.selectedEvent.emit(this.currency.name);
  }
}
