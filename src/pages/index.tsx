import Button from '@/components/Button';
import Coin from '@/components/Coin';
import CountSelector from '@/components/CountSelector';
import Header from '@/components/Header';
import Spinbox from '@/components/Spinbox';
import { preloadAllSounds } from '@/utils/playSoundEffect';
import shuffleArray from '@/utils/shuffleArray';
import { useSpinContext } from '@/utils/SpinContext';
import { animated, easings, useTransition } from '@react-spring/web';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

const data = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

const App = () => {
  const [items, setItems] = useState<number[][]>([data, data, data, data]);

  useEffect(() => {
    const newItems = items.map((item) => shuffleArray(item));

    setItems(newItems);
  }, []);

  const { spinAll, isSpinning, count } = useSpinContext();

  const popInTransition = useTransition(
    Array.from({ length: count }, (_, i) => i),
    {
      from: { transform: 'scale(0)', opacity: 1 },
      enter: {
        transform: 'scale(1)',
        config: { duration: 300, easing: easings.easeOutElastic },
      },
    }
  );

  useEffect(() => {
    preloadAllSounds();
  }, []);

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        {popInTransition((animStyle, i) => (
          <animated.div
            style={animStyle}
            key={i}
            className={styles['transition-wrapper']}
          >
            <Spinbox id={i + 1} items={items[i]} preselectItem={9} />
          </animated.div>
        ))}

        <Button onClick={() => spinAll()} disabled={isSpinning}>
          Spin
        </Button>
      </div>
      <div className={styles.footer}>August 2024</div>
    </div>
  );
};

export default App;
