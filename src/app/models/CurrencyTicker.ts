export interface CurrencyTicker {
  name: string;
  symbol: string;

  price: string;

  logo_url: string;
  [key: string]: any;

  '1d': {
    price_change: string;
    price_change_pct: string;
  };

  '7d': {
    price_change: string;
    price_change_pct: string;
  };
}
