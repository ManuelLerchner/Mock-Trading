import { Component, HostListener } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { CryptoDataService } from 'src/app/services/crypto-data-service';
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
})
export class AppComponent {
  title = 'Mock-Trading';
}
