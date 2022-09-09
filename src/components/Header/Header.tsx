import { FC } from 'react';
import { CurrencyRates } from '../../utils/types';
import styles from './Header.module.css';
import US_Flag from '../../assets/US_Flag.svg';
import EU_Flag from '../../assets/EU_Flag.svg';

interface HeaderProps {
  currencyRates: CurrencyRates
}

const Header: FC<HeaderProps> = ({ currencyRates }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Currency Converter</h1>
      <div className={styles.wrapper}>
        <img className={styles.image} src={US_Flag} />
        <div>USD : {currencyRates.USD_UAH.toFixed(2)}</div>
      </div>
      <div className={styles.wrapper}>
        <img className={styles.image} src={EU_Flag} />
        <div>EUR : {currencyRates.EUR_UAH.toFixed(2)}</div>
      </div>
    </header>
  );
}

export default Header;
