import Spinner from '@/components/Spinner';
import React from 'react';

import styles from './index.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Spin-o-matic-4000</h1>
      <Spinner preselectItem={10} />
      <div className={styles.winnings}></div>
    </div>
  );
};

export default App;
