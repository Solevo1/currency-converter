export interface CurrencyRates {
  USD_UAH: number
  USD_EUR: number
  UAH_USD: number
  UAH_EUR: number
  EUR_USD: number
  EUR_UAH: number
}

export interface ExchangeResponce {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: {
    UAH: number
    EUR: number
  }
}
