import React, { memo } from 'react';

import { REELS_COUNT_MAX, REELS_COUNT_MIN, SOUNDS } from '@/globals/const';
import { playSoundEffect } from '@/utils/playSoundEffect';
import { useSpinContext } from '@/utils/SpinContext';

import styles from './index.module.scss';

/**
 * Component for selecting the number of reels to spin
 */
const CountSelector = () => {
  const { isSpinning, count, setCount } = useSpinContext();

  /**
   * Decreases the reel count down to a minimum of REELS_COUNT_MIN.
   */
  const handleDecrease = () => {
    playSoundEffect(SOUNDS.REMOVE_SLOT);
    setCount((prev) => (prev === REELS_COUNT_MIN ? prev : prev - 1));
  };

  /**
   * Increases the reel count up to a maximum of REELS_COUNT_MAX.
   */
  const handleIncrease = () => {
    playSoundEffect(SOUNDS.ADD_SLOT);
    setCount((prev) => (prev === REELS_COUNT_MAX ? prev : prev + 1));
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Number of reels</p>
      <div className={styles.controls}>
        <button
          className={styles.control}
          onClick={handleDecrease}
          disabled={isSpinning}
        >
          -
        </button>
        <span className={styles.value}>x{count}</span>
        <button
          className={styles.control}
          onClick={handleIncrease}
          disabled={isSpinning}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default memo(CountSelector);
