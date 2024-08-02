import Image from 'next/image';
import React from 'react';

import Emblem from '../../assets/emblem.svg';
import styles from './index.module.scss';

const Coin = () => (
  <div className={styles.wrapper}>
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
