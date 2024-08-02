import Coin from '@/components/Coin';
import CountSelector from '@/components/CountSelector';
import Spinner from '@/components/Spinner';
import { useSpinContext } from '@/utils/SpinContext';
import React from 'react';

import styles from './index.module.scss';

const App = () => {
  const items = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

  const { spinAll, isSpinning, count } = useSpinContext();

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Spin
          <Coin />
          matic
        </h1>

        <CountSelector />
      </div>

      <div className={styles.container}>
        {Array.from({ length: count }).map((_, i) => (
          <Spinner id={i + 1} {...{ items }} preselectItem={10} />
        ))}
      </div>

      <button
        className={styles.button}
        onClick={() => spinAll()}
        disabled={isSpinning}
      >
        Spin
      </button>
      <div className={styles.winnings}></div>
    </div>
  );
};

export default App;
