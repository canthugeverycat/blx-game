import Image from 'next/image';
import React from 'react';

import Emblem from '@/assets/emblem.svg';
import { animated } from '@react-spring/web';

import styles from './index.module.scss';

type SideProps = {
  className: string;
};

const Side = ({ className }: SideProps) => (
  <div className={className}>
    <div className={styles.inner}>
      <Image className={styles.emblem} src={Emblem} alt="" priority={true} />
    </div>
  </div>
);

type Props = {
  className?: string;
  isAnimated?: boolean;
  size?: 'l' | 'm' | 's' | 'xs';
  color?: 'gold' | 'purple' | 'dark';
  animations?: { wrapper?: any; coin?: any };
};

/**
 * Coin component, can be static or animated
 *
 * @param {string} [className]
 * @param {boolean} [isAnimated] If true the coin will rotate infinitely
 * @param {'l' | 'm' | 's' | 'xs'} size
 * @param {'gold' | 'purple' | 'dark'} color
 * @param {Object} [animations] Custom animation configurations
 */
const Coin = ({
  className = '',
  isAnimated,
  size = 'm',
  color = 'gold',
  animations = {},
}: Props) => (
  <animated.div
    style={animations.wrapper}
    className={`
        ${className}
        ${styles.wrapper}
        ${isAnimated ? styles.animated : ''}
        ${styles['size-' + size]}
        ${styles['color-' + color]}
      `}
  >
    <animated.div style={animations.coin} className={styles.coin}>
      <Side className={styles.front} />
      <Side className={styles.back} />
    </animated.div>
  </animated.div>
);

export default Coin;
