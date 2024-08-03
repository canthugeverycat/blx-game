import React, { useMemo } from 'react';

import Coin from '@/components/Coin';
import isPrime from '@/utils/isPrime';

import styles from './index.module.scss';

type Props = {
  item: number;
  isSelected: boolean;
  offset: number;
};

/**
 * A single item in a reel
 *
 * @param {number} item
 * @param {boolean} isSelected
 * @param {number} offset Calculated offset position of the item
 */
const Item = ({ item, isSelected, offset }: Props) => {
  const isWinningNumber = useMemo(() => isPrime(item), [item]);

  return (
    <div
      data-testid={`reel-item-${item}`}
      key={item}
      className={`${styles.item} ${isSelected ? styles.active : ''}`}
      style={{
        transform: `translateX(${offset}px) scale(${isSelected ? '1.5' : '1'})`,
      }}
    >
      <Coin color={isWinningNumber ? 'gold' : 'dark'} />
      <span className={styles.value}>{item}</span>
    </div>
  );
};

export default Item;
