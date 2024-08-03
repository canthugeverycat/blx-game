import { useCallback, useMemo, useState } from 'react';

import { easings, useSpring } from '@react-spring/web';

type Props = {
  id: number;
  items: number[];
  target: number;
  containerWidth: number;
  itemSize: number;
  preselectItem?: number;
  isSpinning: boolean;
  onAnimationEnd?: (result: number) => void;
};

type SpringProps = {
  value: {
    marginLeft: string;
  };
};

/**
 * Manages the reel animation as it moves.
 *
 * @param {number} id
 * @param {number[]} items Reel items
 * @param {number} target Item index to stop at
 * @param {number} containerWidth
 * @param {number} itemSize
 * @param {number} preselectItem Item to initially select
 * @param {boolean} isSpinning
 * @param {function} onAnimationEnd Callback function
 *
 * @returns {{ focusedIndex: number, animationConfig: Object }}
 * @returns {focusedIndex} The index of the currently focused item.
 * @returns {animationConfig} The configuration for the spinner animation.
 */
export const useSpinnerAnimation = ({
  id,
  items,
  target,
  containerWidth,
  itemSize,
  preselectItem = 0,
  isSpinning,
  onAnimationEnd = () => {},
}: Props) => {
  const [focusedIndex, setFocusedIndex] = useState(preselectItem);

  // Calculate offset for the container
  const offset = useMemo(() => {
    return containerWidth
      ? itemSize * (target + 1) - itemSize / 2 - containerWidth / 2
      : 0;
  }, [target, containerWidth]);

  /**
   * Detect what element is in focus
   */
  const handleAnimationChange = useCallback(
    ({ value: { marginLeft } }: SpringProps) => {
      const containerCenter = containerWidth / 2 + itemSize / 2;

      const middleIndex = Math.round(
        (parseFloat(marginLeft) * -1 + containerCenter) / itemSize - 1
      );

      const newFocusedIndex = middleIndex % items.length;

      setFocusedIndex(newFocusedIndex);
    },
    [containerWidth, focusedIndex]
  );

  const animationConfig = useSpring({
    marginLeft: `-${offset}px`,
    config: {
      duration: isSpinning ? 4000 + 2000 * id : 0,
      tension: 200,
      friction: 10,
      easing: easings.easeOutQuad,
    },
    reset: true,
    onRest: () => {
      if (isSpinning) onAnimationEnd(focusedIndex);
    },
    onChange: handleAnimationChange,
  });

  return { focusedIndex, animationConfig };
};
