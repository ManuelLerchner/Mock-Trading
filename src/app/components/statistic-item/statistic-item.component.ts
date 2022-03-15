import { Component, Input, OnInit } from '@angular/core';
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
  @Input() icon!: IconProp

  fa: any = fa;

  constructor() {}

  ngOnInit(): void {}
}
