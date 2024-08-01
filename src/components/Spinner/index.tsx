import { animated, easings, useSpring } from '@react-spring/web';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './index.module.scss';

const itemSize = parseFloat(styles.itemSize);

type Props = {
  preselectItem?: number;
};

const Spinner = ({ preselectItem = 4 }: Props) => {
  const items = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

  const [isSpinning, setIsSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowingChild, setOverflowingChild] = useState(0);
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
    onChange: ({ value: { marginLeft } }) => {
      const containerCenter = containerWidth / 2 + itemSize / 2;
      const middleIndex = Math.round(
        (parseFloat(marginLeft) * -1 + containerCenter) / itemSize - 1
      );
      setFocusedIndex(middleIndex % items.length);
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const child =
          containerRef.current.firstElementChild?.children[overflowingChild];
        const childRect = child?.getBoundingClientRect();
        // console.log(
        //   `${overflowingChild} : ${(childRect?.right || 0) < containerRect.left}`
        // );
        if (childRect && childRect.right < containerRect.left) {
          setPositions((prevPositions) => {
            const newPositions = prevPositions.map((item, i) =>
              i === overflowingChild ? item + 1 : item
            );
            // console.log(
            //   `Setting ${overflowingChild} to ${newPositions[overflowingChild]}`
            // );
            return newPositions;
          });
          setOverflowingChild((prev) => (prev === 19 ? 0 : prev + 1));
        }
      }
    },
  });

  const arrangeChildren = (center: number) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      for (let x = 0; x < items.length; x++) {
        const child = containerRef.current.firstElementChild?.children[x];
        const childRect = child?.getBoundingClientRect();

        if (childRect && childRect.right < containerRect.left) {
          setPositions((prevPositions) => {
            const newPositions = prevPositions.map((item, i) =>
              i === x ? item + 1 : item
            );
            return newPositions;
          });
        }

        if (childRect && childRect.left > containerRect.right) {
          setPositions((prevPositions) => {
            const newPositions = prevPositions.map((item, i) =>
              i === x ? item - 1 : item
            );
            return newPositions;
          });
        }

        const spaceToCenter = (containerRect.width - itemSize) / 2;
        const itemsToCenter = Math.ceil(spaceToCenter / itemSize);
        console.log(itemsToCenter);
        console.log(
          `center: ${center}, itemsToCenter: ${itemsToCenter}, items.length: ${items.length}`
        );
        const startWrappedIndex =
          (center - itemsToCenter + items.length) % items.length;
        console.log(startWrappedIndex);

        setOverflowingChild(startWrappedIndex);
      }
    }
  };

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

    const handleResize = () => {
      // if (
      //   containerRef.current &&
      //   containerWidth &&
      //   containerWidth < containerRef.current.clientWidth
      // ) {
      //   console.log('Container became bigger - updating children...');
      // }
      updateContainerWidth();
      arrangeChildren(focusedIndex);
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
      <button className={styles.button} onClick={handleOnSpin}>
        Spin
      </button>
    </div>
  );
};

export default Spinner;
