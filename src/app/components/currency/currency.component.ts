import * as fa from '@fortawesome/free-solid-svg-icons';

import * as ff from '@fortawesome/free-regular-svg-icons';

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
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit {
  @Input() currency!: CurrencyTicker;
  @Output() buy = new EventEmitter<CurrencyTicker>();
  @Output() sell = new EventEmitter<CurrencyTicker>();

  fa: any = fa;

  currencyTicker!: CurrencyTicker;

  ngOnInit(): void {}

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }
}
