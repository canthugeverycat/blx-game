import Spinner from '@/components/Spinner';
import React from 'react';

import styles from './index.module.scss';

const App = () => {
  const items = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Spin-o-matic-4000</h1>
      <Spinner {...{ items }} preselectItem={10} />
      <div className={styles.winnings}></div>
    </div>
  );
};

export default App;
