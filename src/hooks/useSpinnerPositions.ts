import { arrangeChildren } from '@/utils/arrangeChildren';
import { RefObject, useCallback, useEffect, useState } from 'react';

type Props = {
  containerRef: RefObject<HTMLDivElement>;
  itemSize: number;
  items: number[];
  focusedIndex: number;
  containerWidth: number;
};

export const useSpinnerPositions = ({
  containerRef,
  items,
  itemSize,
  focusedIndex,
  containerWidth,
}: Props) => {
  const [positions, setPositions] = useState<number[]>(
    Array.from({ length: items.length }, () => 0)
  );

  const updatePositions = useCallback(() => {
    if (containerWidth) {
      const newPositions = arrangeChildren({
        container: containerRef,
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
