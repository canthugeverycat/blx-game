import Coin from '@/components/Coin';
import { useSpinContext } from '@/utils/SpinContext';
import { animated, useSpring } from '@react-spring/web';
import React from 'react';

import styles from './index.module.scss';

const Winnings = () => {
  const { winnings } = useSpinContext();

  const animatedProps = useSpring({
    value: winnings,
    config: { duration: 500 },
  });

  return (
    <div className={styles.container}>
      Winnings: <Coin size="xs" />{' '}
      <span className={styles.value}>
        <animated.span>
          {animatedProps.value.to((v) => v.toFixed(0))}
        </animated.span>
      </span>
    </div>
  );
};

export default Winnings;
