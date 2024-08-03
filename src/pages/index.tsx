import React, { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Reel from '@/components/Reel';
import { useSpinContext } from '@/contexts/SpinContext';
import { GITHUB_URL } from '@/globals/const';
import { preloadAllSounds } from '@/utils/playSoundEffect';
import shuffleArray from '@/utils/shuffleArray';
import { animated, easings, useTransition } from '@react-spring/web';

import styles from './index.module.scss';

const data = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

const App = () => {
  const [items, setItems] = useState<number[][]>([data, data, data, data]);

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
    // Shuffles the items and preloads sound effects
    const newItems = items.map((item) => shuffleArray(item));
    setItems(newItems);

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
            <Reel id={i + 1} items={items[i]} preselectItem={9} />
          </animated.div>
        ))}

        <Button onClick={() => spinAll()} disabled={isSpinning}>
          Spin
        </Button>
      </div>
      <div className={styles.footer}>
        <a href={GITHUB_URL} target="_blank">
          github@canthugeverycat
        </a>
      </div>
    </div>
  );
};

export default App;
