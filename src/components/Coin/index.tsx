import Emblem from '@/assets/emblem.svg';
import { animated } from '@react-spring/web';
import Image from 'next/image';
import React from 'react';

import styles from './index.module.scss';

type Props = {
  className?: string;
  isAnimated?: boolean;
  size?: 'l' | 'm' | 's' | 'xs';
  color?: 'gold' | 'purple' | 'dark';
  animations?: { wrapper?: any; coin?: any };
};

const Coin = ({
  className = '',
  isAnimated,
  size = 'm',
  color = 'gold',
  animations = {},
}: Props) => {
  return (
    <animated.div
      style={animations.wrapper}
      className={`${className} ${styles.wrapper} ${isAnimated ? styles.animated : ''} ${styles['size-' + size]} ${styles['color-' + color]}`}
    >
      <animated.div style={animations.coin} className={styles.coin}>
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
      </animated.div>
    </animated.div>
  );
};

export default Coin;
