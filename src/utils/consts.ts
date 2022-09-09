import { CurrencyRates, ExchangeResponce } from './types';

export const mockedResponce: ExchangeResponce = {
  success: true,
  timestamp: 1662558364,
  base: 'USD',
  date: '2022-09-07',
  rates: {
    UAH: 36.938557,
    EUR: 1.000955
  }
}

export const initialRates: CurrencyRates = {
  USD_EUR: 0,
  USD_UAH: 0,
  UAH_EUR: 0,
  UAH_USD: 0,
  EUR_UAH: 0,
  EUR_USD: 0
}
