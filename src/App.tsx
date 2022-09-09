import { FC, useEffect, useState } from 'react';

import CurrencyConversion from './components/CurrencyConversion/CurrencyConversion';
import Header from './components/Header/Header';

import { initialRates } from './utils/consts';
import { exchangeApi } from './utils/exchangeApi';
import { CurrencyRates } from './utils/types';

import styles from './App.module.css';

const App: FC = () => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates>(initialRates);
  const [apiErrorMessage, setApiErrorMessage] = useState<string>();
  useEffect(() => {
    (async () => {
      try {
        const currencyExchangeResponce = await exchangeApi.getCurrencyExchange();
        setCurrencyRates(currencyExchangeResponce);
      } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        setApiErrorMessage(message);
      }
    })();
  }, []);

  return (
    <div className={styles.App}>
      {
        apiErrorMessage
          ? <div>App is experiensing issues: {apiErrorMessage}</div>
          : <>
            <Header currencyRates={currencyRates}/>
            <CurrencyConversion currencyRates={currencyRates}/>
          </>
      }
    </div>
  );
}

export default App;
