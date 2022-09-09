import { ChangeEvent, FC, useState } from 'react';

import { CurrencyRates } from '../../utils/types';
import { calculateCurrencyValue } from '../../utils/helpers';
import SwapIcon from '../../assets/swap.svg'

import styles from './CurrencyConversion.module.css';

interface CurrencyConversionProps {
  currencyRates: CurrencyRates
}

const CurrencyConversion: FC<CurrencyConversionProps> = ({ currencyRates }) => {
  const [formValue, setFormValue] = useState(
    {
      firstCurrencyValue: '',
      firstCurrencyCode: 'USD',
      secondCurrencyValue: '',
      secondCurrencyCode: 'UAH'
    }
  )

  const handleChangeInput = ({ target: { name, value } }:
  ChangeEvent<HTMLInputElement>): void => {
    setFormValue((prev) => {
      let field;
      let rate;
      if (name === 'firstCurrencyValue') {
        field = 'secondCurrencyValue';
        rate = `${prev.firstCurrencyCode}_${prev.secondCurrencyCode}`;
      } else {
        field = 'firstCurrencyValue';
        rate = `${prev.secondCurrencyCode}_${prev.firstCurrencyCode}`;
      }
      const currencyRateValue = currencyRates[rate as keyof CurrencyRates];
      const exception = value === '' || value.includes('-');
      return {
        ...prev,
        [name]: value,
        [field]: exception ? '' : calculateCurrencyValue(currencyRateValue, value)
      }
    });
  }

  const handleChangeCurrency = ({ target: { name, value } }:
  ChangeEvent<HTMLSelectElement>): void => {
    setFormValue((prev) => {
      const rate = name === 'firstCurrencyCode' ? `${value}_${prev.secondCurrencyCode}` : `${prev.firstCurrencyCode}_${value}`;
      const currencyRateValue = currencyRates[rate as keyof CurrencyRates];
      return {
        ...prev,
        [name]: value,
        secondCurrencyValue: calculateCurrencyValue(currencyRateValue,
          prev.firstCurrencyValue)
      }
    });
  }

  const handleClickSwap = (): void => {
    setFormValue((prev) => ({
      ...prev,
      firstCurrencyCode: prev.secondCurrencyCode,
      secondCurrencyCode: prev.firstCurrencyCode,
      secondCurrencyValue: prev.firstCurrencyValue === '' ? '' : calculateCurrencyValue(currencyRates[`${prev.secondCurrencyCode}_${prev.firstCurrencyCode}` as keyof CurrencyRates], prev.firstCurrencyValue)
    }))
  }
  return (
    <main className={styles.wrapper}>
      <div className={styles.flexbox}>
        <input
          className={styles.input}
          name='firstCurrencyValue'
          value={formValue.firstCurrencyValue}
          onChange={handleChangeInput}
          type='number'
          min={0}
        />
        <select
          name='firstCurrencyCode'
          className={styles.select}
          value={formValue.firstCurrencyCode}
          onChange={handleChangeCurrency}
        >
          <option disabled={formValue.secondCurrencyCode === 'UAH'}>UAH</option>
          <option disabled={formValue.secondCurrencyCode === 'USD'}>USD</option>
          <option disabled={formValue.secondCurrencyCode === 'EUR'}>EUR</option>
        </select>
      </div>
      <button onClick={handleClickSwap} className={styles.swapButton}>
        <img className={styles.image} src={SwapIcon} />
      </button>
      <div className={styles.flexbox}>
        <input
          className={styles.input}
          name='secondCurrencyValue'
          value={formValue.secondCurrencyValue}
          onChange={handleChangeInput}
          type='number'
          min='0'
        />
        <select
          name='secondCurrencyCode'
          className={styles.select}
          value={formValue.secondCurrencyCode}
          onChange={handleChangeCurrency}
        >
          <option disabled={formValue.firstCurrencyCode === 'UAH'}>UAH</option>
          <option disabled={formValue.firstCurrencyCode === 'USD'}>USD</option>
          <option disabled={formValue.firstCurrencyCode === 'EUR'}>EUR</option>
        </select>
      </div>
    </main>
  );
}

export default CurrencyConversion;
