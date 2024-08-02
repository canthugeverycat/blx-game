import { useContainerWidth } from '@/hooks/useContainerWidth';
import { useSpinnerAnimation } from '@/hooks/useSpinnerAnimation';
import { useSpinnerPositions } from '@/hooks/useSpinnerPositions';
import { arrangeChildren } from '@/utils/arrangeChildren';
import { animated, easings, useSpring } from '@react-spring/web';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from './index.module.scss';

const itemSize = parseFloat(styles.itemSize);

type Props = {
  items: number[];
  preselectItem?: number;
};

const Spinner = ({ preselectItem = 4, items }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth(containerRef);

  const [isSpinning, setIsSpinning] = useState(false);
  const [target, setTarget] = useState(preselectItem);

  const handleSpinEnd = () => {
    setIsSpinning(false);
  };

  const { focusedIndex, animationConfig } = useSpinnerAnimation({
    items,
    target,
    containerWidth,
    itemSize,
    preselectItem,
    isSpinning,
    onAnimationEnd: handleSpinEnd,
  });

  const { positions } = useSpinnerPositions({
    items,
    focusedIndex,
    containerWidth,
    itemSize,
    containerRef,
  });

  const handleOnSpin = () => {
    setTarget((prev) => prev + 20 + Math.floor(Math.random() * items.length));
    setIsSpinning(true);
  };

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
      <button
        className={styles.button}
        onClick={handleOnSpin}
        disabled={isSpinning}
      >
        Spin
      </button>
    </div>
  );
};

export default Spinner;
