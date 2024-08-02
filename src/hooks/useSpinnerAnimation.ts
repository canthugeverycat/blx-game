import { easings, useSpring } from '@react-spring/web';
import { useCallback, useMemo, useState } from 'react';

type Props = {
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

export const useSpinnerAnimation = ({
  items,
  target,
  containerWidth,
  itemSize,
  preselectItem = 0,
  isSpinning,
  onAnimationEnd = () => {},
}: Props) => {
  const [focusedIndex, setFocusedIndex] = useState(preselectItem);

  const offset = useMemo(() => {
    return containerWidth
      ? itemSize * (target + 1) - itemSize / 2 - containerWidth / 2
      : 0;
  }, [target, containerWidth]);

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
      duration: isSpinning ? 4000 : 0,
      tension: 200,
      friction: 10,
      easing: easings.easeOutQuad,
    },
    reset: true,
    onRest: () => onAnimationEnd(focusedIndex),
    onChange: handleAnimationChange,
  });

  return { focusedIndex, animationConfig };
};
