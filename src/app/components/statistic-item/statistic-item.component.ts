import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistic-item',
  templateUrl: './statistic-item.component.html',
  styleUrls: ['./statistic-item.component.scss'],
})
export class StatisticItemComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: any = '';
  @Input() unit: string = '';
  @Input() icon!: IconProp;

  fa: any = fa;
  oldAmount!: number;

  constructor() {}

  ngOnInit(): void {}

  change: 'increase' | 'decrease' | '' = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value.currentValue !== changes.value.previousValue) {
      this.oldAmount = changes.value.previousValue;
      if (this.value > this.oldAmount) {
        this.change = 'increase';
      } else if (this.value < this.oldAmount) {
        this.change = 'decrease';
      } else {
        this.change = '';
      }

      setTimeout(() => {
        this.change = '';
      }, 6000);
    }
  }
}
