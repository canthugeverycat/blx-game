import Spinner from '@/components/Spinner';
import { useSpinContext } from '@/utils/SpinContext';
import React, { useState } from 'react';

import styles from './index.module.scss';

const App = () => {
  const items = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);
  const [count, setCount] = useState(1);

  const { spinAll, isSpinning } = useSpinContext();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Spin-o-matic-4000</h1>

      <div className={styles['count-container']}>
        {[1, 2, 3, 4].map((n) => (
          <button
            className={`${styles.count} ${n === count ? styles['count--active'] : ''}`}
            onClick={() => setCount(n)}
            disabled={isSpinning}
            key={n}
          >
            x{n}
          </button>
        ))}
      </div>

      {Array.from({ length: count }).map((_, i) => (
        <Spinner id={i + 1} {...{ items }} preselectItem={10} />
      ))}

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
