import React, { useMemo } from 'react';

import Coin from '@/components/Coin';
import { useSpinContext } from '@/contexts/SpinContext';
import { animated, useSpring } from '@react-spring/web';

import styles from './index.module.scss';

type Props = {
  isHovered: boolean;
};

/**
 * Provides animation of inserting a coin into a slot
 *
 * @param {boolean} isHovered
 */
const InsertableCoin = ({ isHovered }: Props) => {
  const { isSpinning } = useSpinContext();

  // Wrapper
  const wrapperTransform = useMemo(() => {
    if (isSpinning) return 'scale(0.7)';
    return isHovered ? 'scale(1.7)' : 'scale(1)';
  }, [isHovered, isSpinning]);

  const wrapperAnimation = useSpring({
    transform: wrapperTransform,
    marginLeft: isSpinning ? '-26px' : '0',
    config: { duration: 85 },
  });

  // Coin
  const coinTransform = useMemo(() => {
    if (isSpinning) return 'rotateY(0deg)';
    return isHovered ? 'rotateY(25deg)' : 'rotateY(90deg)';
  }, [isHovered, isSpinning]);

  const coinAnimation = useSpring({
    transform: coinTransform,
    config: { duration: 85 },
  });

  // Slot
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
