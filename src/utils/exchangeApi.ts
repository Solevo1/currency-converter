import axios, { AxiosError } from 'axios';
import { CurrencyRates, ExchangeResponce } from './types';

export const exchangeApi = {
  async getCurrencyExchange (): Promise<CurrencyRates> {
    try {
      const response = await axios.get<ExchangeResponce>(
        'https://api.apilayer.com/exchangerates_data/latest?symbols=UAH,EUR&base=USD',
        { headers: { apiKey: 'eXX4vBgHH9pSTwG8gl4zn6Krp6ZNkn0y' } }
      );
      const { rates: { UAH, EUR } } = response.data;

      return {
        USD_UAH: UAH,
        USD_EUR: EUR,
        UAH_USD: 1 / UAH,
        UAH_EUR: EUR / UAH,
        EUR_USD: 1 / EUR,
        EUR_UAH: UAH / EUR
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw error;
    }
  }
};
