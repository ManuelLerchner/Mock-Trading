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

  ngOnInit() {}

  onSelect(currency: any): void {
    this.selectEvent.emit(currency);
  }
}
