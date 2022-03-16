import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
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

  @Input() selected: string = '';

  ngOnInit() {}

  onSelect(currency: string): void {
    this.selected = currency;
    this.selectEvent.emit(currency);
  }
}
