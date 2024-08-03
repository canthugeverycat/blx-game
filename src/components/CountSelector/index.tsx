import { SOUNDS } from '@/globals/const';
import { playSoundEffect } from '@/utils/playSoundEffect';
import { useSpinContext } from '@/utils/SpinContext';
import React, { memo } from 'react';

import styles from './index.module.scss';

const CountSelector = () => {
  const { isSpinning, count, setCount } = useSpinContext();

  const handleDecrease = () => {
    playSoundEffect(SOUNDS.REMOVE_SLOT);
    setCount((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncrease = () => {
    playSoundEffect(SOUNDS.ADD_SLOT);
    setCount((prev) => (prev === 4 ? prev : prev + 1));
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>Number of spins</p>
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
