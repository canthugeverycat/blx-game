import { SOUNDS } from '@/globals/const';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import { useSpinnerAnimation } from '@/hooks/useSpinnerAnimation';
import { useSpinnerPositions } from '@/hooks/useSpinnerPositions';
import variables from '@/styles/variables.module.scss';
import { playSoundEffect } from '@/utils/playSoundEffect';
import { useSpinContext } from '@/utils/SpinContext';
import { animated } from '@react-spring/web';
import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';
import Item from './Item';

const itemSize = parseFloat(variables.itemSize);

type Props = {
  id: number;
  items: number[];
  preselectItem?: number;
};

const Spinbox = ({ id, preselectItem = 4, items }: Props) => {
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
    onAnimationEnd: (i) => {
      onSpinEnd(items[i]);
    },
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
      const timeout = setTimeout(
        () => {
          const result = Math.floor(Math.random() * items.length);
          const buffer = containerWidth > 768 ? 40 : 20;

          setTarget((prev) => prev + buffer * id + result);

          playSoundEffect(SOUNDS.START_SPIN);

          onSpinStart();
        },
        100 * id - 100
      );

      return () => clearTimeout(timeout);
    }
  }, [isSpinning]);

  useEffect(() => {
    if (isSpinning) {
      playSoundEffect(SOUNDS.STEP_TICK);
    }
  }, [focusedIndex]);

  return (
    <div className={styles.spinbox} ref={containerRef}>
      <animated.div className={styles.wrapper} style={animationConfig}>
        {items.map((item, i) => {
          const offset = items.length * itemSize * positions[i];

          return (
            <Item
              key={i}
              isSelected={focusedIndex === i}
              {...{ offset, item }}
            />
          );
        })}
      </animated.div>
      <div
        className={`${styles.beam} ${isSpinning ? styles.animate : ''}`}
      ></div>
      <div className={styles.trackers}></div>
    </div>
  );
};

export default Spinbox;
