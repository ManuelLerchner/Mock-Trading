import * as fa from '@fortawesome/free-solid-svg-icons';

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
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

  currencyTicker!: CurrencyTicker;

  ngOnInit(): void {}

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }

  select() {
    this.selectedEvent.emit(this.currency.name);
  }
}
