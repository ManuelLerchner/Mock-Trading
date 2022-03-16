import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { animate, style, trigger, transition } from '@angular/animations';
import { DatabaseService } from 'src/app/services/database.service';
import { User as FirebaseUser } from 'firebase/auth';
import { PortfolioItem } from 'src/app/models/PortfolioItem';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';
import * as fa from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    trigger('slideBottom', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(280px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(280px)' })),
      ]),
    ]),
  ],
})
export class PortfolioComponent implements OnInit {
  @Input() liveCurrencyTickers: CurrencyTicker[] = [];
  @Output() selectedEvent = new EventEmitter<string>();
  @Input() selected: string = '';

  portfolio: PortfolioItem[] = [];
  portfolioUnsubscribeFunction: any = null;
  userUnsubscribeFunction: any = null;
  fa: any = fa;

  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService
  ) {}

  userMoney: number = 0;
  userStartMoney: number = 0;

  ngOnInit() {
    this.authService.auth.onAuthStateChanged((user) => {
      if (user) {
        let portRef = this.databaseService.getCurrentPortfolio(
          user as FirebaseUser
        );

        let userRef = this.databaseService.getCurrentProfile(
          user as FirebaseUser
        );

        userRef.get().then((snapshot: any) => {
          let data = snapshot.data();
          this.userMoney = data.money;
          this.userStartMoney = data.startMoney;
        });

        this.userUnsubscribeFunction = userRef.onSnapshot((snapshot: any) => {
          let data = snapshot.data();
          this.userMoney = data.money;
          this.userStartMoney = data.startMoney;
        });

        portRef.get().then((snapshot: any) => {
          let data = snapshot.data();
          this.portfolio = this.unpackData(data);
          this.sortPortfolio();
        });

        this.portfolioUnsubscribeFunction = portRef.onSnapshot(
          (snapshot: any) => {
            let data = snapshot.data();
            this.portfolio = this.unpackData(data);
            this.sortPortfolio();
          }
        );
      } else {
        if (this.portfolioUnsubscribeFunction) {
          this.portfolioUnsubscribeFunction();
        }
        if (this.userUnsubscribeFunction) {
          this.userUnsubscribeFunction();
        }
      }
    });

    let sortFirstTimeOut = setInterval(() => {
      this.sortPortfolio();

      let currency = this.getCurrency('BTC');

      if (currency && currency.price !== '') {
        clearInterval(sortFirstTimeOut);
      }
    }, 1000);
  }

  unpackData(data: any) {
    if (data) {
      return Object.entries(data).map(
        ([symbol, amount]) =>
          ({
            symbol,
            amount,
          } as PortfolioItem)
      );
    }

    return [];
  }

  sortPortfolio() {
    this.portfolio = this.portfolio.sort((a, b) => this.valueComparator(a, b));
  }

  valueComparator(a: PortfolioItem, b: PortfolioItem): number {
    return (
      parseFloat(this.getCurrency(b.symbol).price) * b.amount -
      parseFloat(this.getCurrency(a.symbol).price) * a.amount
    );
  }

  ngOnDestroy() {
    if (this.portfolioUnsubscribeFunction) {
      this.portfolioUnsubscribeFunction();
    }
    if (this.userUnsubscribeFunction) {
      this.userUnsubscribeFunction();
    }
  }

  getCurrency(symbol: string) {
    return this.liveCurrencyTickers.find(
      (currency: CurrencyTicker) => currency.symbol === symbol
    ) as CurrencyTicker;
  }

  calculateTotalValue() {
    return this.portfolio.reduce(
      (acc, curr) =>
        acc + curr.amount * parseFloat(this.getCurrency(curr.symbol).price),
      0
    );
  }

  calculateNetWorth() {
    return this.userMoney + this.calculateTotalValue();
  }

  calculateUserMoney() {
    return this.userMoney;
  }

  calculateTotalGain() {
    return 100 * (this.calculateNetWorth() / this.userStartMoney - 1);
  }

  selectedHandler(currency: string) {
    this.selectedEvent.emit(currency);
  }
}
