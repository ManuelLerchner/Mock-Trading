import { Component } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-service';
import { CurrencyTicker } from './models/CurrencyTicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Mock-Trading';

  currencyNames: string[] = ['BTC', 'ETH', 'XRP', 'DOGE', 'USDT', 'SOL'];

  currencyTickers!: CurrencyTicker[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    //Start values
    this.currencyTickers = [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: '',
        logo_url:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        price: '',
        logo_url:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/eth.svg',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      },
      {
        symbol: 'USDT',
        name: 'Tether',
        price: '',
        logo_url:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/usdt.svg',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      },
      {
        symbol: 'XRP',
        name: 'XRP',
        price: '',
        logo_url:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/XRP.svg',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      },
      {
        symbol: 'SOL',
        name: 'SOLANA',
        price: '',
        logo_url:
          'https://nomics-api.s3.us-east-2.amazonaws.com/static/images/currencies/SOL2.jpg',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      },
      {
        symbol: 'DOGE',
        name: 'Dogecoin',
        price: '',
        logo_url:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/doge.svg',
        '1d': {
          price_change: '',
          price_change_pct: '',
        },
        '7d': {
          price_change: '',
          price_change_pct: '',
        },
      },
    ];

    let updateData = () => {
      let data = this.dataService.fetchData(this.currencyNames);

      data.subscribe((data) => {
        this.currencyTickers = data;
        console.log(this.currencyTickers);
      });
    };

    updateData();

    setInterval(() => updateData(), 1000 * 10);
  }
}
