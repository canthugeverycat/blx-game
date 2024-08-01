import { animated, easings, useSpring } from '@react-spring/web';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './index.module.scss';

const itemSize = parseFloat(styles.itemSize);

const App = () => {
  const items = Array.from({ length: 20 }, (_, i) => (i % 20) + 1);

  const [isSpinning, setIsSpinning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowingChild, setOverflowingChild] = useState(0);
  const [positions, setPositions] = useState(
    Array.from({ length: items.length }, () => 0)
  );
  const [containerWidth, setContainerWidth] = useState(0);

  const [focusedIndex, setFocusedIndex] = useState(4);
  const [target, setTarget] = useState(4);
  const offset = useMemo(() => {
    return containerWidth
      ? itemSize * (target + 1) - itemSize / 2 - containerWidth / 2
      : 0;
  }, [target, containerWidth]);

  const props = useSpring({
    marginLeft: `-${offset}px`,
    config: {
      duration: isSpinning ? 3000 : 0,
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

        console.log(
          `${overflowingChild} : ${(childRect?.right || 0) < containerRect.left}`
        );

        if (childRect && childRect.right < containerRect.left) {
          setPositions((prevPositions) => {
            const newPositions = prevPositions.map((item, i) =>
              i === overflowingChild ? item + 1 : item
            );
            console.log(
              `Setting ${overflowingChild} to ${newPositions[overflowingChild]}`
            );
            return newPositions;
          });

          setOverflowingChild((prev) => (prev === 19 ? 0 : prev + 1));
        }
      }
    },
  });

  const handleOnSpin = () => {
    setTarget((prev) => prev + 20 + Math.floor(Math.random() * items.length));
    setIsSpinning(true);
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, [containerRef.current]);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>
        Spin-o-matic-4000 {isSpinning ? 's' : ''}
      </h1>
      <h1 className={styles.title}>Focused index: {focusedIndex}</h1>
      <h1 className={styles.title}>Result: {items[target % items.length]}</h1>
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
      <div className={styles.winnings}></div>
    </div>
  );
};

export default App;
