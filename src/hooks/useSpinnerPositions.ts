import { RefObject, useCallback, useEffect, useState } from 'react';

import arrangeChildren from '@/utils/arrangeChildren';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  containerWidth: number;
  itemSize: number;
  items: number[];
  focusedIndex: number;
};

/**
 * Calculates positions of items in the reel and updates them
 *
 * @param {RefObject<HTMLDivElement>} containerRef
 * @param {number} containerWidth
 * @param {number[]} items Reel items
 * @param {number} itemSize
 * @param {number} focusedIndex Index of the currently focused item
 *
 * @returns {{ positions: number[] }}
 * @returns {positions} The array of item positions in the reel
 */
export const useSpinnerPositions = ({
  containerRef,
  containerWidth,
  items,
  itemSize,
  focusedIndex,
}: Props) => {
  const [positions, setPositions] = useState<number[]>(
    Array.from({ length: items.length }, () => 0)
  );

  const updatePositions = useCallback(() => {
    if (containerWidth) {
      const newPositions = arrangeChildren({
        containerRef,
        length: items.length,
        itemSize,
        focusedIndex,
        containerWidth,
        positions,
      });
      setPositions(newPositions);
    }
  }, [items.length, itemSize, focusedIndex, containerWidth, positions]);

  useEffect(() => {
    updatePositions();
  }, [focusedIndex, containerWidth]);

  return { positions };
};
