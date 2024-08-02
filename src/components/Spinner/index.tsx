import { useContainerWidth } from '@/hooks/useContainerWidth';
import { useSpinnerAnimation } from '@/hooks/useSpinnerAnimation';
import { useSpinnerPositions } from '@/hooks/useSpinnerPositions';
import { useSpinContext } from '@/utils/SpinContext';
import { animated } from '@react-spring/web';
import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

const itemSize = parseFloat(styles.itemSize);

type Props = {
  id: number;
  items: number[];
  preselectItem?: number;
};

const Spinner = ({ id, preselectItem = 4, items }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth(containerRef);

  const { isSpinning, onSpinStart, onSpinEnd } = useSpinContext();

  const [target, setTarget] = useState(preselectItem);

  const { focusedIndex, animationConfig } = useSpinnerAnimation({
    id,
    items,
    target,
    containerWidth,
    itemSize,
    preselectItem,
    isSpinning,
    onAnimationEnd: onSpinEnd,
  });

  const { positions } = useSpinnerPositions({
    items,
    focusedIndex,
    containerWidth,
    itemSize,
    containerRef,
  });

  useEffect(() => {
    if (isSpinning) {
      const timeout = setTimeout(() => {
        const result = Math.floor(Math.random() * items.length);

        setTarget((prev) => prev + 20 * id + result);

        onSpinStart();
      }, 500 * id);

      return () => clearTimeout(timeout);
    }
  }, [isSpinning]);

  return (
    <div className={styles.container}>
      <div className={styles.spinbox} ref={containerRef}>
        <animated.div
          className={styles['spinbox-wrapper']}
          style={animationConfig}
        >
          {items.map((item, i) => (
            <div
              key={item}
              className={`${styles['spinbox-item']} ${focusedIndex === i ? styles['spinbox-item--selected'] : ''}`}
              style={{
                transform: `translateX(${items.length * itemSize * positions[i]}px) scale(${focusedIndex === i ? '1.5' : '1'})`,
              }}
            >
              {item}
            </div>
          ))}
        </animated.div>
      </div>
    </div>
  );
};

export default Spinner;
