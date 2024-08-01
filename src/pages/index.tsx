import Spinner from '@/components/Spinner';
import { animated, easings, useSpring } from '@react-spring/web';

import styles from './index.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Spin-o-matic-4000</h1>
      <Spinner preselectItem={4} />
      <div className={styles.winnings}></div>
    </div>
  );
};

export default App;
