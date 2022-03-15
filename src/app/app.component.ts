import { Component, HostListener } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-service';
import { CurrencyTicker } from './models/CurrencyTicker';
import {
  animate,
  transition,
  trigger,
  style,
  useAnimation,
  state,
  group,
} from '@angular/animations';
import { INITIAL_TICKERS } from './initialTickers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

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
      transition('void => *', [animate('0.6s 0.6s ease-out')]),
      transition('* => void', [animate('0.6s  ease-out')]),

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
export class AppComponent {
  title = 'Mock-Trading';

  currencyNames: string[] = ['BTC', 'ETH', 'XRP', 'DOGE', 'USDT', 'SOL'];

  selectedCurrency: string = 'Bitcoin';

  liveCurrencyTickers!: CurrencyTicker[];

  isExpanded = true;
  public innerWidth: any;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    //Start values
    this.liveCurrencyTickers = INITIAL_TICKERS;

    let updateData = () => {
      let data = this.dataService.fetchData(this.currencyNames);

      data.subscribe((data) => {
        this.liveCurrencyTickers = data;
      });
    };

    updateData();
    // console.log(this.liveCurrencyTickers);
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
