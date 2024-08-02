import Image from 'next/image';
import React from 'react';

import Emblem from '../../assets/emblem.svg';
import styles from './index.module.scss';

type Props = {
  isAnimated?: boolean;
  size?: 'm' | 's';
  color?: 'gold' | 'purple' | 'dark';
};

const Coin = ({ isAnimated, size = 'm', color = 'gold' }: Props) => (
  <div
    className={`${styles.wrapper} ${isAnimated ? styles.animated : ''} ${styles['size-' + size]} ${styles['color-' + color]}`}
  >
    <div className={styles.coin}>
      <div className={styles.front}>
        <div className={styles.inner}>
          <Image className={styles.emblem} src={Emblem} alt="" />
        </div>
      </div>
      <div className={styles.back}>
        <div className={styles.inner}>
          <Image className={styles.emblem} src={Emblem} alt="" />
        </div>
      </div>
    </div>
  </div>
);

export default Coin;
