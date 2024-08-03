import Coin from '@/components/Coin';
import isPrime from '@/utils/isPrime';
import React, { useMemo } from 'react';

import styles from './index.module.scss';

type Props = {
  item: number;
  isSelected: boolean;
  offset: number;
};

const Item = ({ item, isSelected, offset }: Props) => {
  const isWinningNumber = useMemo(() => isPrime(item), [item]);

  return (
    <div
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
