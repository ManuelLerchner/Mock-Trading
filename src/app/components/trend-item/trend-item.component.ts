import { Component, Input, OnInit } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';

@Component({
  selector: 'app-trend-item',
  templateUrl: './trend-item.component.html',
  styleUrls: ['./trend-item.component.scss'],
})
export class TrendItemComponent implements OnInit {
  @Input() trendPoint: any;
  @Input() currency!: CurrencyTicker;
  constructor() {}

  ngOnInit(): void {}

  pctToNumber(input: string) {
    var numeric = Number(input);
    return numeric * 100;
  }
}
