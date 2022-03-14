import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { animate, style, trigger, transition } from '@angular/animations';
import { DatabaseService } from 'src/app/services/database.service';
import { User as FirebaseUser } from 'firebase/auth';
import { PortfolioItem } from 'src/app/models/PortfolioItem';

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
  constructor(
    public authService: AuthService,
    public databaseService: DatabaseService
  ) {}

  portfolio: PortfolioItem[] = [];
  unsubscribeFunction: any = null;

  ngOnInit() {
    this.authService.auth.onAuthStateChanged((user) => {
      if (user) {
        let portRef = this.databaseService.getCurrentPortfolio(
          user as FirebaseUser
        );

        portRef.get().then((snapshot: any) => {
          let data = snapshot.data();
          this.portfolio = this.unpackData(data);
        });

        this.unsubscribeFunction = portRef.onSnapshot((snapshot: any) => {
          let data = snapshot.data();
          this.portfolio = this.unpackData(data);
        });
      } else {
        if (this.unsubscribeFunction) {
          this.unsubscribeFunction();
        }
      }
    });
  }

  unpackData(data: any) {
    return Object.entries(data).map(
      ([symbol, amount]) =>
        ({
          symbol,
          amount,
        } as PortfolioItem)
    );
  }

  ngOnDestroy() {
    if (this.unsubscribeFunction) {
      this.unsubscribeFunction();
    }
  }
}
