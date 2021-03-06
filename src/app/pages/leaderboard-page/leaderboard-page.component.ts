import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyTicker } from 'src/app/models/CurrencyTicker';
import { PortfolioItem } from 'src/app/models/PortfolioItem';
import { Profile } from 'src/app/models/Profile';
import { CryptoDataService } from 'src/app/services/crypto-data-service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss'],
})
export class LeaderboardPageComponent implements OnInit {
  numberIterator = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  leaderboard: Profile[] = [];
  liveCurrencyTickers: CurrencyTicker[] = [];

  getProfile(num: number) {
    return this.leaderboard[num];
  }
  constructor(
    private databaseService: DatabaseService,
    private dataService: CryptoDataService
  ) {}

  ngOnInit(): void {
    let updateData = () => {
      let data = this.dataService.fetchData();

      data.subscribe((data) => {
        if (data.length > 0) {
          this.liveCurrencyTickers = data;
          this.updateLeaderBoard();
        }
      });
    };

    updateData();
    setInterval(() => updateData(), 1000 * 10);
  }

  async updateLeaderBoard() {
    let profiles = this.databaseService.getProfiles().limit(9).get();
    let portfolios = this.databaseService.getPortfolios().get();

    Promise.all([profiles, portfolios]).then(([profiles, portfolios]) => {
      let newLeaderBoard: Profile[] = [];

      let currentCurrencies = this.liveCurrencyTickers;

      profiles.docs.forEach((profileDoc) => {
        let profile: any = profileDoc.data();

        let portfolio = portfolios.docs.find((userPortfolio: any) => {
          return userPortfolio.id === profileDoc.id;
        });

        let newObject = {
          displayName: profile.name,
          imgUrl: profile.photoURL,
          money: profile.money,
        };

        if (portfolio) {
          newObject.money += this.calculateValue(
            portfolio.data() as PortfolioItem[],
            currentCurrencies
          );
        }

        newLeaderBoard.push(newObject);
      });

      newLeaderBoard.sort((a, b) => b.money - a.money);

      this.leaderboard = newLeaderBoard;
    });
  }

  calculateValue(
    portfolio: PortfolioItem[],
    currentCurrencies: CurrencyTicker[]
  ) {
    let sum = 0;
    this.unpackData(portfolio).forEach((item) => {
      let currency = currentCurrencies.find(
        (currency) => currency.symbol === item.symbol
      );

      if (currency) {
        sum += parseFloat(currency.price) * item.amount;
      }
    });

    return sum;
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
}
