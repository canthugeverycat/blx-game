import Coin from '@/components/Coin';
import { useSpinContext } from '@/utils/SpinContext';
import { animated, easings, useSpring } from '@react-spring/web';
import React, { useMemo } from 'react';

import styles from './index.module.scss';

type Props = {
  isReady: boolean;
};

const InsertableCoin = ({ isReady }: Props) => {
  const { isSpinning } = useSpinContext();

  const wrapperTransform = useMemo(() => {
    if (isSpinning) return 'scale(0.7)';
    return isReady ? 'scale(1.7)' : 'scale(1)';
  }, [isReady, isSpinning]);

  const coinTransform = useMemo(() => {
    if (isSpinning) return 'rotateY(0deg)';
    return isReady ? 'rotateY(25deg)' : 'rotateY(90deg)';
  }, [isReady, isSpinning]);

  const wrapperAnimation = useSpring({
    transform: wrapperTransform,
    marginLeft: isSpinning ? '-26px' : '0',
    config: { duration: 100 },
  });
  const coinAnimation = useSpring({
    transform: coinTransform,
    config: { duration: 100 },
  });

  const slotAnimation = useSpring({
    transform: isSpinning ? 'scale(0.9)' : 'scale(1)',
    config: { duration: 100 },
  });

  return (
    <div className={styles.container}>
      <animated.div
        style={slotAnimation}
        className={styles.slot}
      ></animated.div>

      <Coin
        className={styles.coin}
        size="s"
        animations={{ wrapper: wrapperAnimation, coin: coinAnimation }}
      />
    </div>
  );
};

export default InsertableCoin;
