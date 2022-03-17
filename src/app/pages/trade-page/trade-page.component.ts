import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';
import { CryptoDataService } from 'src/app/services/crypto-data-service';

@Component({
  selector: 'app-trade-page',
  templateUrl: './trade-page.component.html',
  styleUrls: ['./trade-page.component.scss'],
  animations: [
    trigger('slideLeft', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-380px)', width: '0px' }),
        animate(
          '750ms',
          style({ opacity: 1, transform: 'translateX(0px)', width: '380px' })
        ),
      ]),
      transition(':leave', [
        animate(
          '750ms',
          style({ opacity: 0, transform: 'translateX(-380px)', width: '0px' })
        ),
      ]),
    ]),
    trigger('replace', [
      transition('void => *', [animate('0.3s 0.3s ease-in')]),
      transition('* => void', [animate('0.3s  ease-out')]),

      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-380px)',
          height: '0px',
        })
      ),
      state(
        '*',
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        })
      ),
    ]),
  ],
})
export class TradePageComponent implements OnInit {
  selectedCurrency: string = 'Bitcoin';

  liveCurrencyTickers: CurrencyTicker[] = [];

  isExpanded = true;
  public innerWidth: any;
  constructor(private dataService: CryptoDataService) {}

  ngOnInit(): void {
    //Start values

    let updateData = () => {
      let data = this.dataService.fetchData();

      data.subscribe((data) => {
        this.liveCurrencyTickers = data;
      });
    };

    updateData();

    setInterval(() => updateData(), 1000 * 10);

    this.innerWidth = window.innerWidth;
    this.checkIfNeedsToBeExpanded();
  }

  toggleSideBar() {
    this.isExpanded = !this.isExpanded;
  }

  onSelect(currency: any): void {
    this.selectedCurrency = currency;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.checkIfNeedsToBeExpanded();
  }

  checkIfNeedsToBeExpanded() {
    if (this.innerWidth < 768) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
  }
}
