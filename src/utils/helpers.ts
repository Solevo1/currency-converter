export const calculateCurrencyValue = (currencyRate: number, baseValue: string): string =>
  (currencyRate * Number(baseValue)).toFixed(2)
