import { RefObject, useEffect, useState } from 'react';

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
