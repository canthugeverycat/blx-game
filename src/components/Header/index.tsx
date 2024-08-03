import Coin from '@/components/Coin';
import CountSelector from '@/components/CountSelector';
import Winnings from '@/components/Winnings';
import React from 'react';

import styles from './index.module.scss';

const Header = () => (
  <div className={styles.header}>
    <div className={styles.container}>
      <h1 className={styles.title}>
        Spin
        <Coin isAnimated={true} size="l" color="purple" />
        matic
      </h1>

      <Winnings />
    </div>

    <CountSelector />
  </div>
);

export default Header;
