import React, { useEffect, useRef, useState } from 'react';

import { useSpinContext } from '@/contexts/SpinContext';
import {
  BREAKPOINT_TABLET_PX,
  DEFAULT_PRESELECTED_INDEX,
  SLOT_ITEM_SIZE,
  SOUNDS,
  SPIN_DELAY_MS,
} from '@/globals/const';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import { useSpinnerAnimation } from '@/hooks/useSpinnerAnimation';
import { useSpinnerPositions } from '@/hooks/useSpinnerPositions';
import { playSoundEffect } from '@/utils/playSoundEffect';
import { animated } from '@react-spring/web';

import styles from './index.module.scss';
import Item from './Item';

type Props = {
  id: number;
  items: number[];
  preselectItem?: number;
};

/**
 * A spinning reel in a slot machine
 * This is the root point for spinning logic
 *
 * @param {number} id
 * @param {number[]} items The reel items
 * @param {number} preselectItem The item index to preselect
 */
const Reel = ({
  id,
  preselectItem = DEFAULT_PRESELECTED_INDEX,
  items,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerWidth } = useContainerWidth(containerRef);
  const { isSpinning, onSpinStart, onSpinEnd } = useSpinContext();

  // The end index of a spin
  const [target, setTarget] = useState(preselectItem);

  // Animate the reel and detect the middle item
  const { focusedIndex, animationConfig } = useSpinnerAnimation({
    id,
    items,
    target,
    containerWidth,
    itemSize: SLOT_ITEM_SIZE,
    preselectItem,
    isSpinning,
    onAnimationEnd: (i) => {
      onSpinEnd(items[i]);
    },
  });

  // Position the items inside the reel
  const { positions } = useSpinnerPositions({
    items,
    focusedIndex,
    containerWidth,
    itemSize: SLOT_ITEM_SIZE,
    containerRef,
  });

  useEffect(() => {
    if (isSpinning) {
      // Spin starts
      const timeout = setTimeout(
        () => {
          const result = Math.floor(Math.random() * items.length);
          // Ensure the reel will spin for at least 1 round before stopping
          const buffer = containerWidth > BREAKPOINT_TABLET_PX ? 40 : 20;

          setTarget((prev) => prev + buffer * id + result);

          onSpinStart();
        },
        // We add a delay if there are multiple reels so they start one by one
        SPIN_DELAY_MS * id - SPIN_DELAY_MS
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
    <div className={styles.reel} ref={containerRef}>
      <animated.div
        data-testid="reel-wrapper"
        className={styles.wrapper}
        style={animationConfig}
      >
        {items.map((item, i) => {
          const offset = items.length * SLOT_ITEM_SIZE * positions[i];

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

export default Reel;
