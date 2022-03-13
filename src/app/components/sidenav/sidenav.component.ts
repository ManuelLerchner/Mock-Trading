import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  ngOnInit(): void {}

  @Input() isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  onSelect(currency: any): void {
    this.selectEvent.emit(currency);
  }
}
