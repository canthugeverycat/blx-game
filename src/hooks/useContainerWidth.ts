import { RefObject, useEffect, useState } from 'react';

/**
 * Calculates the width of an element
 *
 * @param {any} containerRef A reference to the element
 *
 * @returns {{ containerWidth: number }}
 * @returns {containerWidth} The current width of the container in pixels.
 */
export const useContainerWidth = (
  containerRef: RefObject<HTMLDivElement>
): { containerWidth: number } => {
  const [containerWidth, setContainerWidth] = useState(0);

  const updateContainerWidth = () => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateContainerWidth();

    const handleResize = () => {
      updateContainerWidth();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef.current]);

  return { containerWidth };
};
