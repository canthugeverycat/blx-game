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
  preselectItem?: number;
};

const Spinner = ({ preselectItem = 4 }: Props) => {
  const items = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

  const [isSpinning, setIsSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(
    Array.from({ length: items.length }, () => 0)
  );
  const [containerWidth, setContainerWidth] = useState(0);

  const [focusedIndex, setFocusedIndex] = useState(preselectItem);
  const [target, setTarget] = useState(preselectItem);
  const offset = useMemo(() => {
    return containerWidth
      ? itemSize * (target + 1) - itemSize / 2 - containerWidth / 2
      : 0;
  }, [target, containerWidth]);

  const handleAnimationChange = useCallback(
    ({ value: { marginLeft } }: { value: { marginLeft: string } }) => {
      const containerCenter = containerWidth / 2 + itemSize / 2;
      const middleIndex = Math.round(
        (parseFloat(marginLeft) * -1 + containerCenter) / itemSize - 1
      );

      const newFocusedIndex = middleIndex % items.length;

      setFocusedIndex(newFocusedIndex);
    },
    [containerWidth, focusedIndex]
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
  }, [
    containerRef.current,
    items.length,
    itemSize,
    focusedIndex,
    containerWidth,
    positions,
  ]);

  useEffect(() => {
    updatePositions();
  }, [focusedIndex]);

  const props = useSpring({
    marginLeft: `-${offset}px`,
    config: {
      duration: isSpinning ? 4000 : 0,
      tension: 200,
      friction: 10,
      easing: easings.easeOutQuad,
    },
    reset: true,
    onRest: () => {
      setIsSpinning(false);
    },
    onChange: handleAnimationChange,
  });

  const handleOnSpin = () => {
    setTarget((prev) => prev + 20 + Math.floor(Math.random() * items.length));
    setIsSpinning(true);
  };

  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateContainerWidth();
    updatePositions();

    const handleResize = () => {
      updateContainerWidth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef.current, containerWidth]);

  return (
    <div className={styles.container}>
      <div className={styles.spinbox} ref={containerRef}>
        <animated.div className={styles['spinbox-wrapper']} style={props}>
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
